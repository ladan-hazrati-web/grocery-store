import { useNavigate } from "react-router-dom";
import IconShop from "./IconShop";
import IconUserAccount from "./IconUserAccount";
import { setError, setPage } from "../../slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { GoHeart } from "react-icons/go";

function FixHeaderMobile() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { userId } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
    <div className="lg:hidden shadow-md shadow-gray-500 fixed bottom-0 px-[20px] left-0 flex w-full bg-white lg:py-2  justify-between items-center h-[60px] z-50">
      <IconShop inFixHeaderMobile={true} />

      <div
        className="w-1/4 cursor-pointer flex flex-col items-center"
        onClick={navigateToWishlistPage}
      >
        <GoHeart size={23} />
        <p className="text-[12px]">wishlist</p>
      </div>

      <IconUserAccount inFixHeaderMobile={true} />
    </div>
  );
}

export default FixHeaderMobile;
