import { Routes, Route } from "react-router-dom";
import React, { useEffect, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { supabase } from "./supabase/supabaseClient";
import { setAuthStatus, setError, setUser } from "./slices/authSlice";
import { setCart, setUserId } from "./slices/cartSlice";
import { setWishlist, updateProductsWithWishlist } from "./slices/productSlice";
import { AnimatePresence } from "framer-motion";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Message from "./components/message/Message";
import MenuAuthLogin from "./components/auth/MenuAuthLogin";
import MenuCart from "./components/menuCart/MenuCart";
import SidebarMenu from "./components/header/SidebarMenu";
import ProtectRoute from "./components/privateRoute/ProtectRoute";
import AuthRedirect from "./components/privateRoute/AuthRedirect";
import CheckoutRedirect from "./components/privateRoute/CheckoutRedirect";
import Home from "./pages/Home";
import ShopPage from "./pages/ShopPage";
import CartPage from "./pages/CartPage";
import NotFoundPage from "./pages/NotFoundPage";
import DetailProduct from "./pages/DetailProduct";
import AuthPage from "./pages/AuthPage";
import LostPassword from "./pages/LostPassword";
import ResetPassword from "./pages/ResetPassword";
import CheckoutPage from "./pages/CheckoutPage";
import OrderPage from "./pages/OrderPage";
import DashboardPage from "./pages/DashboardPage";
import FilterMenu from "./components/shop/FilterMenu";
import ProductModal from "./components/productsSlider/ProductModal";

// تابع برای خواندن داده از localStorage
const getLocalStorageData = (key, defaultValue = null) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  } catch (error) {
    console.log(error);
    return defaultValue;
  }
};

const MemoizedMenuAuthLogin = React.memo(MenuAuthLogin);
const MemoizedMenuCart = React.memo(MenuCart);
const MemoizedSidebarMenu = React.memo(SidebarMenu);
const MemoizedFilterMenu = React.memo(FilterMenu);
const MemoizedProductModal = React.memo(ProductModal);

function App() {
  const dispatch = useDispatch();
  const { userId, openMenuCart } = useSelector((state) => state.cart);
  const { openMenuAuth } = useSelector((state) => state.auth);
  const { openSidebarMenu, openFilterMenu, openProductModal } = useSelector(
    (state) => state.items
  );

  // مدیریت سشن
  const retrieveSession = useCallback(async () => {
    try {
      const { data, error } = await supabase.auth.getSession();
      if (error) throw error;

      const sessionData = data.session ? data : null;
      dispatch(setAuthStatus(!!sessionData));
      dispatch(setUserId(sessionData ? sessionData.session.user.id : null));
      localStorage.setItem("data", JSON.stringify(sessionData));

      dispatch(setUser(sessionData));
    } catch (error) {
      dispatch(setError(error.message));
    }
  }, [dispatch]);

  // تنظیم سشن از localStorage
  const setSession = useCallback(async () => {
    const user = getLocalStorageData("user");
    if (user) {
      const { error } = await supabase.auth.setSession({
        access_token: user.session.access_token,
        refresh_token: user.session.refresh_token,
      });
      if (error) {
        dispatch(setError(error.message));
        localStorage.removeItem("user");
      }
    }
  }, [dispatch]);

  useEffect(() => {
    setSession().then(() => retrieveSession());
  }, [retrieveSession, setSession]);

  const menuComponents = useMemo(
    () => (
      <AnimatePresence>
        {openMenuAuth && <MemoizedMenuAuthLogin />}
        {openMenuCart && <MemoizedMenuCart />}
        {openSidebarMenu && <MemoizedSidebarMenu />}
        {openFilterMenu && <MemoizedFilterMenu />}
        {openProductModal && <MemoizedProductModal />}
      </AnimatePresence>
    ),
    [
      openMenuAuth,
      openMenuCart,
      openSidebarMenu,
      openFilterMenu,
      openProductModal,
    ]
  );

  useEffect(() => {
    if (userId) {
      // دریافت لیست علاقه‌مندی‌ها و سبد خرید
      const wish = getLocalStorageData(`wishlist_${userId}`, []);
      dispatch(setWishlist(wish));
      dispatch(updateProductsWithWishlist(wish));

      const cart = getLocalStorageData(`cart_${userId}`, []);
      dispatch(setCart(cart));

      const userData =
        getLocalStorageData("data") || getLocalStorageData("user");
      dispatch(setUser(userData));
    }
  }, [userId, dispatch]);

  return (
    <>
      <Header />
      {menuComponents}
      <Message />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="shop" element={<ShopPage />} />
        <Route path="auth" element={<AuthRedirect element={<AuthPage />} />} />
        <Route path="cart" element={<CartPage />} />
        <Route path=":id" element={<DetailProduct />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route
          path="dashboard"
          element={<ProtectRoute element={<DashboardPage />} />}
        />
        <Route path="lostpassword" element={<LostPassword />} />
        <Route path="resetpassword" element={<ResetPassword />} />
        <Route
          path="checkout"
          element={<CheckoutRedirect element={<CheckoutPage />} />}
        />
        <Route path="product/:id" element={<DetailProduct />} />
        <Route path="order" element={<OrderPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
