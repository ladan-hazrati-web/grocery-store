import { createSelector, createSlice } from "@reduxjs/toolkit";
import { loginUser } from "./authSlice";

export const selectCartItems = (state) => state.cart.cartItems;
export const selectSubtotal = createSelector(
  [selectCartItems],
  (cartItems) =>
    cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0) || 0
);

export const getStoredData = (keyPrefix) => {
  const userId = JSON.parse(localStorage.getItem("userId"));
  const storageKey = userId ? `${keyPrefix}_${userId}` : null;
  const storedData = storageKey ? localStorage.getItem(storageKey) : null;
  return storedData ? JSON.parse(storedData) : [];
};

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: getStoredData("cart"),
    openMenuCart: false,
    userId: localStorage.getItem("userId") || null,
    productOrdered: getStoredData("orders"),
  },
  reducers: {
    addToCart: (state, action) => {
      const { product, number } = action.payload;

      // اگر عدد معتبر نبود، خروج از تابع
      if (!Number.isInteger(Number(number)) || Number(number) <= 0) return;

      const existingProductIndex = state.cartItems.findIndex(
        (item) => item.id === product.id
      );

      if (existingProductIndex !== -1) {
        // اگر محصول در سبد خرید بود، مقدار quantity را افزایش بده
        state.cartItems[existingProductIndex] = {
          ...state.cartItems[existingProductIndex],
          quantity:
            state.cartItems[existingProductIndex].quantity + Number(number),
        };
      } else {
        // اگر محصول جدید بود، به سبد خرید اضافه کن
        state.cartItems.push({ ...product, quantity: Number(number) });
      }
      if (state.userId) {
        localStorage.setItem(
          `cart_${state.userId}`,
          JSON.stringify(state.cartItems)
        );
      }
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );

      // به‌روزرسانی localStorage بعد از حذف آیتم
      if (state.userId) {
        localStorage.setItem(
          `cart_${state.userId}`,
          JSON.stringify(state.cartItems)
        );
      }
    },

    clearCart: (state) => {
      state.cartItems = [];
      localStorage.removeItem(`cart_${state.userId}`); // حذف از localStorage
    },
    clearCartAfterLogout: (state) => {
      state.cartItems = [];
    },
    setOpenMenuCart: (state) => {
      state.openMenuCart = true;
    },
    setCloseMenuCart: (state) => {
      state.openMenuCart = false;
    },
    setProductQuantity: (state, action) => {
      const { id, quantity } = action.payload;

      // پیدا کردن محصول با id خاص
      const productIndex = state.cartItems.findIndex((item) => item.id === id);

      if (productIndex !== -1) {
        // به‌روزرسانی مقدار quantity محصول موردنظر
        state.cartItems[productIndex].quantity = quantity;
        if (state.userId) {
          localStorage.setItem(
            `cart_${state.userId}`,
            JSON.stringify(state.cartItems)
          );
        }
      }
    },
    setCart: (state, action) => {
      state.cartItems = action.payload;
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
      localStorage.setItem("userId", JSON.stringify(state.userId));
      // در صورت وجود سبد خرید در LocalStorage، آن را بارگذاری می‌کنیم
      const savedCart = localStorage.getItem(`cart_${state.userId}`);
      if (savedCart) {
        state.cartItems = JSON.parse(savedCart);
      } else {
        state.cartItems = [];
      }
    },
    setProductOrdered: (state, action) => {
      const previousOrders =
        JSON.parse(localStorage.getItem(`orders_${state.userId}`)) || [];

      // تغییر وضعیت سفارشات قبلی به "Canceled"
      const updatedOrders = previousOrders.map((order) => ({
        ...order,
        status: "Cancelled",
      }));

      // اضافه کردن سفارش جدید
      const newOrder = {
        id: `#${Math.floor(Math.random() * 100000)}`,
        orderDetails: action.payload,
        items: state.cartItems,
        time: new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        status: "On hold",
      };

      // ذخیره در state و localStorage
      state.productOrdered = [...updatedOrders, newOrder];

      localStorage.setItem(
        `orders_${state.userId}`,
        JSON.stringify(state.productOrdered)
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.userId = action.payload.userId; // مقدار userId رو اینجا آپدیت می‌کنیم
    });
  },
});

export const {
  addToCart,
  setCloseMenuCart,
  setOpenMenuCart,
  setProductQuantity,
  removeFromCart,
  setUserId,
  clearCart,
  clearCartAfterLogout,
  setProductOrdered,
  setCart,
} = cartSlice.actions;
export default cartSlice.reducer;
