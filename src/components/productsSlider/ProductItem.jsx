import formatUSDT from "../../hooks/formatPrice";
import IconWishlist from "../header/IconWishlist";
import { IoIosSearch } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { IoMdCheckmark } from "react-icons/io";
import { BsCart2 } from "react-icons/bs";
import styled from "styled-components";
import { useState } from "react";
import { addToCart, setOpenMenuCart } from "../../slices/cartSlice";
import { setError } from "../../slices/authSlice";
import {
  getProductById,
  removeFromWishlist,
  setOpenProductModal,
} from "../../slices/productSlice";
import { useNavigate } from "react-router-dom";

const CartButton = styled.button`
  width: 100%;
  height: 40px;
  text-align: center;
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden !important;
  background: #e72438;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  transition: background 0.3s;

  &:hover {
    background: #d62839;
  }

  .text,
  .icon {
    transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
  }

  .text {
    transform: translateY(0);
    opacity: 1;
    position: absolute;
  }

  @media screen and (min-width: 1024px) {
    .icon {
      transform: translateY(100%);
      opacity: 0;
      position: absolute;
    }
    &:hover .icon {
      transform: translateY(0);
      opacity: 1;
    }
  }

  &:hover .text {
    transform: translateY(-100%);
    opacity: 0;
  }
`;

function ProductItem({ product, customWidth, inWishlist, inShop }) {
  const [number, setNumber] = useState(1);
  const dispatch = useDispatch();
  const { userId } = useSelector((state) => state.cart);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { wishlist } = useSelector((state) => state.items);
  const isFavorite = wishlist.some((item) => item.id === product.id);
  const navigate = useNavigate();

  const handleAddToCart = () => {
    if (!number) {
      dispatch(setError("Please enter a valid quantity."));
      return;
    }
    if (!userId || !isAuthenticated) {
      dispatch(setError("You need to log in to add items to your cart."));
      navigate('/auth')
      return;
    }
    dispatch(addToCart({ number, product }));
    dispatch(setOpenMenuCart());
  };

  const handleQuantityChange = (e) => {
    setNumber(e.target.value.replace(/[^0-9]/g, ""));
  };

  return (
    <div
      className={` ${customWidth && "lg:w-[40%]"} ${
        inShop ? "w-[50%] lg:w-[33%]" : "w-full"
      }`}
    >
      <figure className="relative overflow-hidden group">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-auto rounded-lg cursor-pointer"
          onClick={() => navigate(`/product/${product.id}`)}
        />

        {inWishlist && (
          <button
            className="absolute z-20 top-10 lg:top-5 hover:text-gray-600"
            onClick={() => dispatch(removeFromWishlist(product.id))}
          >
            <span>x </span>
            <span className="text-[12px]">Remove</span>
          </button>
        )}

        {/* دکمه‌های اکشن دسکتاپ */}
        <div className="bg-white hidden lg:flex flex-col items-center justify-center gap-4 py-4 shadow-sm shadow-gray-200 absolute top-5 right-5 w-0 overflow-hidden transition-all duration-300 group-hover:w-[50px] opacity-0 group-hover:overflow-visible group-hover:opacity-100">
          <button
            onClick={() => {
              dispatch(setOpenProductModal());
              dispatch(getProductById(product));
            }}
          >
            <IoIosSearch size={25} />
          </button>
          {isFavorite ? (
            <IoMdCheckmark size={20} />
          ) : (
            <IconWishlist product={product} />
          )}
        </div>

        {/* دکمه‌های اکشن موبایل */}
        <div className="lg:hidden flex justify-center items-center shadow-sm p-2 shadow-gray-300 absolute top-5 right-5 bg-white rounded-full">
          {isFavorite ? (
            <IoMdCheckmark size={20} />
          ) : (
            <IconWishlist product={product} />
          )}
        </div>

        {/* افزودن به سبد خرید */}
        <div className="flex overflow-hidden  lg:scale-y-0  lg:group-hover:scale-y-100 lg:w-full w-fit text-white bg-red-500 hover:bg-red-600 justify-between items-center absolute bottom-0 left-3 lg:opacity-0 lg:overflow-hidden lg:group-hover:opacity-100 lg:group-hover:overflow-visible transition-all duration-300">
          <div className="flex order-2 lg:-order-1 bg-red-600">
            <button className="px-4 py-2" onClick={() => setNumber(Number(number) + 1)}>
              +
            </button>
            <input
              value={number}
              onInput={handleQuantityChange}
              type="text"
              className="text-center w-[20px] bg-red-600 py-2 text-white focus:outline-none border-none"
            />
            <button
              className="px-4 py-2"
              onClick={() => setNumber(Number(number) > 1 ? Number(number) - 1 : 1)}
            >
              -
            </button>
          </div>
          <CartButton onClick={handleAddToCart}>
            <span className="text hidden  lg:inline-block">Add to Cart</span>
            <BsCart2 className="icon text-white mx-3" size={25} />
          </CartButton>
        </div>
      </figure>

      {/* جزئیات محصول */}
      <div className="mt-2 text-center">
        <h4 className="mt-2 text-center text-sm font-medium text-[13px]">
          {product.name}
        </h4>
        <p className="text-gray-400 text-[14px]">{product.category}</p>
        <p className="text-red-700 text-[14px] font-bold">
          {formatUSDT(product.price)}
        </p>
      </div>
    </div>
  );
}

export default ProductItem;
