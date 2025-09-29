import { useDispatch } from "react-redux";
import formatUSDT from "../../hooks/formatPrice";
import { removeFromCart, setCloseMenuCart } from "../../slices/cartSlice";
import { IoIosClose } from "react-icons/io";
import QuantityControls from "./QuantityControls";
import { useNavigate } from "react-router-dom";
// کامپوننت محصول داخل سبد خرید
const CartItem = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className="flex items-start p-2 border-b border-gray-200 hover:bg-gray-100 transition-all">
      <figure
        className="w-[35%] flex justify-center"
        onClick={() => {
          navigate(`/product/${product.id}`);
          dispatch(setCloseMenuCart());
        }}
      >
        <img
          src={product.image}
          alt={product.name}
          className="lg:w-[75%] w-[85%]"
        />
      </figure>
      <div className="w-full px-2">
        <p className="text-[12px] font-bold text-gray-600">{product.name}</p>
        <QuantityControls id={product.id} quantity={product.quantity} />
        <p className="text-[12px] font-bold">
          <span className="text-gray-500">{product.quantity} x </span>
          <span className="text-red-500">{formatUSDT(product.price)}</span>
        </p>
      </div>
      <button
        onClick={() => dispatch(removeFromCart(product.id))}
        className="cursor-pointer"
      >
        <IoIosClose size={20} />
      </button>
    </div>
  );
};
export default CartItem;
