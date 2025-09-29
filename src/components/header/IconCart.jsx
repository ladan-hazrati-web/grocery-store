import { HiOutlineShoppingBag } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { setOpenMenuCart, setCart } from "../../slices/cartSlice";
import { useEffect } from "react";

function IconCart() {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const { userId } = useSelector((state) => state.cart);

  const handleClick = () => {
    dispatch(setOpenMenuCart());
  };

  // دریافت مقدار cartItems از localStorage بعد از لاگین
  useEffect(() => {
    if (userId) {
      const storedCart =
        JSON.parse(localStorage.getItem(`cart_${userId}`)) || [];
      dispatch(setCart(storedCart));
    }
  }, [userId, dispatch]);

  const quantityTotal = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <button onClick={handleClick} className="relative">
      <HiOutlineShoppingBag size={20} />
      <p className="absolute flex justify-center items-center -top-1 -right-2 bg-red-600 text-white rounded-full text-[10px] p-2 max-w-[15px] max-h-[15px]">
        {quantityTotal || "0"}
      </p>
    </button>
  );
}

export default IconCart;
