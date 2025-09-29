import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setError, setPage } from "../../slices/authSlice";
import { GoHeart } from "react-icons/go";

function IconFavorite() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { wishlist } = useSelector((state) => state.items);
  const { userId } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const quantityLike = wishlist.length > 0 ? wishlist.length : "0";
  function navigateToWishlistPage() {
    if (userId && isAuthenticated) {
      navigate("/dashboard");
      dispatch(setPage("wishlist"));
    } else if (!userId || !isAuthenticated) {
      dispatch(setError("Please Login to website"));
      navigate("/auth");
    }
  }
  return (
    <button className="relative" onClick={navigateToWishlistPage}>
      <GoHeart size={23} />
      <p
        className={`absolute ${
          quantityLike === "0" ? "hidden" : "flex"
        } flex justify-center items-center -top-1 -right-2 bg-red-600 text-white rounded-full text-[10px] p-2 max-w-[15px] max-h-[15px]`}
      >
        {quantityLike}
      </p>
    </button>
  );
}

export default IconFavorite;
