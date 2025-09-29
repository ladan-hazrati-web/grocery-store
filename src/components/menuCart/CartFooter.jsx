import { useNavigate } from "react-router-dom";
import formatUSDT from "../../hooks/formatPrice";
import { setCloseMenuCart } from "../../slices/cartSlice";
import { useDispatch } from "react-redux";

// کامپوننت فوتر سبد خرید
const CartFooter = ({ subtotal }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div className="p-4 sticky bottom-0 left-0 w-full bg-white shadow-md">
      <div className="flex justify-between py-3 border-b border-gray-200">
        <p className="font-bold text-gray-800">Subtotal:</p>
        <p className="text-red-500 font-semibold">{formatUSDT(subtotal)}</p>
      </div>
      <button
        onClick={() => {
          navigate("/cart");
          dispatch(setCloseMenuCart());
        }}
        className="bg-gray-100 w-full uppercase text-gray-900 px-5 py-2 text-[14px]"
      >
        View Cart
      </button>
      <button
        onClick={() => {
          navigate("/checkout");
          dispatch(setCloseMenuCart());
        }}
        className="bg-red-600 mt-4 w-full uppercase text-white px-5 py-2 text-[15px]"
      >
        Checkout
      </button>
    </div>
  );
};
export default CartFooter;
