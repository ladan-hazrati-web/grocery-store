import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ResponsiveContainer from "../components/responsive/ResponsiveContainer";
import { BiErrorCircle } from "react-icons/bi";
import { ClipLoader } from "react-spinners";
import formatUSDT from "../hooks/formatPrice";
import AddToCartControl from "../components/productsSlider/AddToCartControl";
import payments from "../assets/images/detailProduct/payments.png";
import IconWishlist from "../components/header/IconWishlist";
import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../slices/authSlice";
import CommentForm from "../components/comment/CommentForm";
import Comments from "../components/comment/ShowComment";
function DetailProduct() {
  const { id } = useParams();

  const [product, setProduct] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { wishlist } = useSelector((state) => state.items);
  const isExitinWishlist = wishlist.find((p) => p.id === product.id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const imageRef = useRef(null);

  const handleMouseMove = (e) => {
    const { left, top, width, height } =
      imageRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;

    const zoom = 1.3;
    const moveX = (x - 0.5) * -100;
    const moveY = (y - 0.5) * -100;

    imageRef.current.style.transform = `scale(${zoom}) translate(${moveX}px, ${moveY}px)`;
  };

  const handleMouseLeave = () => {
    imageRef.current.style.transform = "scale(1) translate(0, 0)";
  };
  const goToWishlist = () => {
    navigate("/dashboard");
    dispatch(setPage("wishlist"));
  };
  useEffect(() => {
    const fetchProductById = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await axios.get(
          `https://6794d2e4aad755a134ea83c6.mockapi.io/woodmart/products/${id}`
        );
        const { data } = res;
        setProduct(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProductById();
  }, [id]);

  if (error) {
    return (
      <div className=" mt-16 flex flex-wrap min-h-[300px] justify-center items-center ">
        <BiErrorCircle size={250} color="red" />{" "}
        <p className="text-center my-8 w-full text-[20px] md:text-[25px] font-bold text-red-600">
          Error:{error}
        </p>
      </div>
    );
  }

  return (
    <ResponsiveContainer type="section">
      <div className="w-full">
        {loading && (
          <div className="w-full min-h-[500px] items-center flex justify-center">
            <ClipLoader color="gray" size={150} />
          </div>
        )}
        {Object.keys(product).length !== 0 && (
          <>
            <div className="w-full flex my-5  flex-wrap lg:flex-nowrap justify-center lg:border-b ">
              <figure
                className="w-full lg:w-[50%] items-center flex justify-center overflow-hidden relative"
                style={{ height: "500px", perspective: "1000px" }}
              >
                <img
                  ref={imageRef}
                  src={product.image}
                  alt={product.name}
                  className="transition-all duration-200 ease-in-out"
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  style={{
                    width: "85%",
                    height: "100%",
                    object: "cover",
                    imageRendering: "smooth",
                    transition: "transform 0.3s ease-out",
                  }}
                />
              </figure>
              <div className="w-full lg:w-[50%] py-10 mx-4">
                <h2 className="text-[28px]">{product.name}</h2>
                <p className="text-red-600 text-[20px] py-4 font-bold">
                  {formatUSDT(product.price)}
                </p>
                {product.nutrition.map(({ type, value }, index) => (
                  <div
                    key={index}
                    className={`w-full flex justify-between items-center ${
                      index + 1 === product.nutrition.length && "border-none"
                    } border-b border-dashed py-1  `}
                  >
                    <p className="text-[15px]">{type}:</p>
                    <p className="text-[14px] text-gray-400">{value}</p>
                  </div>
                ))}
                <AddToCartControl product={product} />
                <img
                  src={payments}
                  alt="payments"
                  className="w-[100%] object-cover mx-auto"
                />
                <div className="flex my-3 pb-3 gap-2 items-center border-b">
                  <IconWishlist product={product} />
                  <p className="text-[13px]">
                    {isExitinWishlist ? (
                      <button onClick={goToWishlist}>Brows to wishlist</button>
                    ) : (
                      "Add to Wishlist"
                    )}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-[14px]">Category:</p>
                  <p className="text-[13px] text-gray-500">
                    {product.category}
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full lg:my-10 flex flex-wrap lg:flex-nowrap">
              <Comments productId={product.id} />
              <CommentForm productName={product.name} productId={product.id} />
            </div>
          </>
        )}
      </div>
    </ResponsiveContainer>
  );
}

export default DetailProduct;
