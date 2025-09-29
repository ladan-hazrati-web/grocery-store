import { useDispatch, useSelector } from "react-redux";
import { setError, setMessageSuccess } from "../../slices/authSlice";
import { addToWishlist } from "../../slices/productSlice";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoIosCheckmark } from "react-icons/io";
import { useNavigate } from "react-router-dom";
function IconWishlist({ product }) {
  const dispatch = useDispatch();
  const { userId } = useSelector((state) => state.cart);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { wishlist } = useSelector((state) => state.items);
  const isExitinWishlist = wishlist.find((p) => p.id === product.id);
  const navigate = useNavigate();
  const handleAddtoWishlist = () => {
    if (userId && isAuthenticated) {
      dispatch(addToWishlist({ product, userId }));
      dispatch(setMessageSuccess(`${product.name} add to wishlist`));
    } else if (!userId || !isAuthenticated) {
      dispatch(setError("please login to website and add to wishlist"));
      navigate("/auth");
    }
  };
  return (
    <>
      {isExitinWishlist ? (
        <button disabled>
          <IoIosCheckmark size={25} />
        </button>
      ) : (
        <button onClick={handleAddtoWishlist}>
          <IoMdHeartEmpty size={25} />
        </button>
      )}
    </>
  );
}

export default IconWishlist;
