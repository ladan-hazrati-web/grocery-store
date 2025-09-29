import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigation } from "swiper/modules";
import { ClipLoader } from "react-spinners";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { BiMessageAltError } from "react-icons/bi";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { fetchProducts } from "../../slices/productSlice";
import ResponsiveContainer from "../responsive/ResponsiveContainer";
import ProductItem from "./ProductItem";
import { motion } from "framer-motion";

function ProductSlider({ title, sliceStart, sliceEnd, filter = "NEW" }) {
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [activeFilter, setActiveFilter] = useState(filter);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef(null);
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.items);

  useEffect(() => {
    if (!products.length) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length]);

  const filteredProducts = useMemo(() => {
    return products
      .slice(sliceStart, sliceEnd)
      .filter((product) => product.status.includes(activeFilter));
  }, [products, activeFilter, sliceStart, sliceEnd]);

  const handleSlideChange = useCallback((swiper) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  }, []);

  const handleFilterChange = (newFilter) => {
    setActiveFilter(newFilter);
    if (swiperRef.current) {
      swiperRef.current.swiper.slideTo(0); // Reset to the first slide when filter changes
    }
  };

  if (error) {
    return (
      <div className="flex items-center justify-center h-[400px] gap-5">
        <p className="text-red-500 text-[20px]">{error}</p>
        <BiMessageAltError color="red" size={35} />
      </div>
    );
  }

  return (
    <ResponsiveContainer type="section">
      <div className="w-full">
        <div className="w-full px-4 after:mx-4 md:gap-8 relative my-5 md:flex-nowrap items-center flex-wrap flex after:w-full after:h-[1px] after:absolute after:bottom-8 md:after:bottom-0 after:left-0 after:bg-gray-200">
          <h2 className="text-[14px] xl:text-[18px] uppercase w-fit whitespace-nowrap relative after:w-[250px] md:after:w-full after:content-[''] after:z-10 after:absolute after:bg-red-500 after:h-[2px] after:-bottom-[4px] after:left-0">
            {title}
          </h2>
          <div className="flex gap-6 w-[85%] p-2">
            {["NEW", "FEATURED", "TOP_SELLERS"].map((type) => (
              <button
                key={type}
                onClick={() => handleFilterChange(type)}
                className={`uppercase text-[12px] md:text-[12px] xl:text-[14px] ${
                  activeFilter === type ? "text-red-700" : "text-black"
                }`}
              >
                {type.replace("_", " ")}
              </button>
            ))}
          </div>

          <div className="flex">
            <button
              ref={prevRef}
              className={`absolute right-8 -top-2 z-10 p-2 transition-opacity duration-300 ease-in-out ${
                isBeginning
                  ? "opacity-50 cursor-not-allowed"
                  : "opacity-100 cursor-pointer"
              }`}
            >
              <IoIosArrowBack size={20} />
            </button>
            <button
              ref={nextRef}
              className={`absolute right-0 -top-2 z-10 p-2 transition-opacity duration-300 ease-in-out ${
                isEnd
                  ? "opacity-50 cursor-not-allowed"
                  : "opacity-100 cursor-pointer"
              }`}
            >
              <IoIosArrowForward size={20} />
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-[400px]">
          <ClipLoader size={50} color="#36d7b7" />
        </div>
      ) : (
        <motion.div
          key={activeFilter}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }} // انیمیشن ساده‌تر و سریع‌تر
        >
          <Swiper
            ref={swiperRef}
            modules={[Navigation]}
            spaceBetween={30} // فاصله کمتر بین اسلایدها
            navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }}
            onSlideChange={handleSlideChange}
            slidesPerView={2}
            breakpoints={{
              481: { slidesPerView: 2, spaceBetween: 10 },
              768: { slidesPerView: 3, spaceBetween: 10 },
              1024: { slidesPerView: 4, spaceBetween: 15 },
              1280: { slidesPerView: 5, spaceBetween: 15 },
            }}
            className="w-full"
          >
            {filteredProducts.map((product, index) => (
              <SwiperSlide key={product.id} className="py-8 group">
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.2, // انیمیشن سریع‌تر
                    ease: "easeOut", // از ease استفاده می‌کنیم
                    delay: 0.05 * index,
                  }}
                >
                  <ProductItem product={product} />
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      )}
    </ResponsiveContainer>
  );
}

export default ProductSlider;
