import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectSubtotal, setCloseMenuCart } from "../../slices/cartSlice";
import { motion } from "framer-motion";
import CartItem from "./CartItem";
import CartFooter from "./CartFooter";
import { TbShoppingCartX } from "react-icons/tb";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";
const MenuCart = () => {
  const dispatch = useDispatch();
  const subtotal = useSelector(selectSubtotal);
  const { cartItems } = useSelector((state) => state.cart);

  const hasItems = useMemo(() => cartItems.length > 0, [cartItems]);
  const navigate = useNavigate();
  return (
    <motion.div
      className="fixed right-0 top-0 w-full bg-black bg-opacity-70 h-screen z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={() => dispatch(setCloseMenuCart())}
    >
      <motion.div
        className="absolute right-0 top-0 w-[300px] md:w-[350px] bg-white max-h-screen h-full overflow-y-auto flex flex-col"
        initial={{ x: "100%" }}
        animate={{ x: "0%" }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between py-4 px-3 border-b border-gray-200">
          <p>Shopping Cart</p>
          <button
            className="flex items-center"
            onClick={() => dispatch(setCloseMenuCart())}
          >
            <IoMdClose />
            <p>Close</p>
          </button>
        </div>

        {/* Content */}
        <div className="flex-grow overflow-y-auto">
          {!hasItems ? (
            <div className="flex flex-wrap justify-center py-10">
              <TbShoppingCartX size={100} className="text-gray-300" />
              <p className="w-full text-[12px] font-bold py-5 text-center">
                No products in the cart.
              </p>
              <button
                className="bg-red-600 uppercase text-white px-5 py-2 text-[12px]"
                onClick={() => {
                  navigate("/shop");
                  dispatch(setCloseMenuCart());
                }}
              >
                Return to Shop
              </button>
            </div>
          ) : (
            cartItems.map((product) => (
              <CartItem key={product.id} product={product} />
            ))
          )}
        </div>

        {/* Footer */}
        {hasItems && <CartFooter subtotal={subtotal} />}
      </motion.div>
    </motion.div>
  );
};

export default MenuCart;
