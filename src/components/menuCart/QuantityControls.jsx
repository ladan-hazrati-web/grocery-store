import { useDispatch } from "react-redux";
import { removeFromCart, setProductQuantity } from "../../slices/cartSlice";

// کامپوننت مدیریت تعداد محصول
const QuantityControls = ({ id, quantity }) => {
  const dispatch = useDispatch();
  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) {
      dispatch(removeFromCart(id));
      return;
    }
    dispatch(setProductQuantity({ id, quantity: newQuantity }));
  };

  return (
    <div className="flex py-2">
      <button
        type="button"
        className="py-1 px-2 border-2 border-gray-200 text-gray-400 hover:bg-red-500 hover:text-white transition-all"
        onClick={() => handleQuantityChange(quantity - 1)}
      >
        -
      </button>
      <input
        type="text"
        value={quantity}
        className="p-1 text-[15px] text-center border-2 border-r-0 border-l-0 border-gray-200 w-[30px] text-gray-400"
        onChange={(e) =>
          handleQuantityChange(Number(e.target.value.replace(/[^0-9]/g, "")))
        }
      />
      <button
        type="button"
        className="py-1 px-2 border-2 border-gray-200 text-gray-400 hover:bg-red-500 hover:text-white transition-all"
        onClick={() => handleQuantityChange(quantity + 1)}
      >
        +
      </button>
    </div>
  );
};
export default QuantityControls;
