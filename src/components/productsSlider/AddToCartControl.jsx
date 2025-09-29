import { useState } from "react";
import { addToCart, setOpenMenuCart } from "../../slices/cartSlice";
import { setError } from "../../slices/authSlice";
import { setCloseProductModal } from "../../slices/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
function AddToCartControl({ product }) {
  const [number, setNumber] = useState(1);
  const { userId } = useSelector((state) => state.cart);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleQuantityChange = (e) => {
    setNumber(e.target.value.replace(/[^0-9]/g, ""));
  };
  const handleAddToCart = () => {
    if (!number) {
      dispatch(setError("Please enter a valid quantity."));
      return;
    }
    if (!userId || !isAuthenticated) {
      dispatch(setError("You need to log in to add items to your cart."));
      navigate("/auth");
      return;
    }
    dispatch(addToCart({ number, product }));
    dispatch(setOpenMenuCart());
    dispatch(setCloseProductModal());
  };
  return (
    <div className="border-b gap-2 flex my-4 pb-4">
      <div className="flex  justify-center  ">
        {/* handle quantity  */}
        <button
          className="px-2 py-2 border"
          onClick={() => setNumber(Number(number) + 1)}
        >
          +
        </button>
        <input
          value={number}
          onInput={handleQuantityChange}
          type="text"
          className="text-center w-[30px] border  text-black  focus:outline-none "
        />
        <button
          className="px-2 py-2 border"
          onClick={() => setNumber(Number(number) > 1 ? number - 1 : 1)}
        >
          -
        </button>
      </div>
      <button
        onClick={handleAddToCart}
        className="bg-red-700 uppercase text-[9px] md:text-[15px] text-white py-1 px-4"
      >
        Add to cart
      </button>
    </div>
  );
}

export default AddToCartControl;
