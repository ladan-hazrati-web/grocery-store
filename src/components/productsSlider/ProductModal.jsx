import { useDispatch, useSelector } from "react-redux";

import { setCloseProductModal } from "../../slices/productSlice";
import formatUSDT from "../../hooks/formatPrice";
import { IoMdClose } from "react-icons/io";
import AddToCartControl from "./AddToCartControl";
const ProductModal = () => {
  const dispatch = useDispatch();
  const { product } = useSelector((state) => state.items);

  return (
    <div
      className="fixed flex justify-center right-0 items-center top-0 w-full bg-black bg-opacity-70 h-screen z-50"
      onClick={() => dispatch(setCloseProductModal())}
    >
      <div
        className=" w-[380px] md:w-[600px] lg:w-[800px] bg-white max-h-screen py-10 "
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <button
            onClick={() => dispatch(setCloseProductModal())}
            className="absolute -top-20 right-0  "
          >
            <IoMdClose size={25} color="white" />
          </button>
          <div className="w-full flex-wrap md:flex-nowrap flex items-start justify-between">
            <img
              src={product.image}
              alt=""
              className="w-full md:w-[50%] h-[300px] md:h-auto object-contain"
            />
            <div className="w-full md:w-[50%] mt-10 flex flex-col md:items-start justify-center items-center text-center">
              <h2 className="text-[22px]">{product.name}</h2>
              <p className="text-red-500 md:text-[18px] font-bold">
                {formatUSDT(product.price)}
              </p>
              <AddToCartControl product={product} />
              <div>
                <p className="text-[14px]">
                  Category:{" "}
                  <span className="text-gray-500 text-[13px]">
                    {product.category}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
