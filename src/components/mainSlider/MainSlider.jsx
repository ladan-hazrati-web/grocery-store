import { useEffect, useState, useCallback, useRef } from "react";
import { Navigation, EffectFade, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "./Slider.css";
import { dataSlider } from "./dataSlider";
import ResponsiveContainer from "../responsive/ResponsiveContainer";

function MainSlider() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const imageRefs = useRef([]);
  const textContainerRefs = useRef([]);

  const applyAnimations = useCallback(() => {
    const currentImage = imageRefs.current[activeSlide];
    const currentTextContainer = textContainerRefs.current[activeSlide];

    // Apply pop-in animation for image
    if (currentImage) {
      currentImage.classList.add("scale-in");
      setTimeout(() => {
        currentImage.classList.add("active");
      }, 10);
    }

    // Apply line-by-line animation for text elements
    if (currentTextContainer) {
      const textElements =
        currentTextContainer.querySelectorAll("h2, p, button");
      textElements.forEach((element, index) => {
        setTimeout(() => {
          element.classList.add("active");
        }, index * 150); // Delay 150ms between each line
      });
    }
  }, [activeSlide]);

  const resetAnimations = useCallback(() => {
    const images = document.querySelectorAll("img.scale-in");
    const textContainers = document.querySelectorAll(".text-container");

    images.forEach((image) => image.classList.remove("scale-in", "active"));
    textContainers.forEach((container) => {
      const textElements = container.querySelectorAll("h2, p, button");
      textElements.forEach((element) => element.classList.remove("active"));
    });
  }, []);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(applyAnimations, 100);
      return () => clearTimeout(timer);
    }
  }, [activeSlide, isVisible, applyAnimations]);

  useEffect(() => {
    setIsVisible(false);
    resetAnimations();
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, [activeSlide, resetAnimations]);

  return (
    <Swiper
      modules={[Navigation, EffectFade, Autoplay]}
      slidesPerView={1}
      effect="fade"
      loop={true}
      navigation={{
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      }}
      autoplay={{ delay: 20000 }} // 20 seconds delay
      onSlideChange={({ realIndex }) => setActiveSlide(realIndex)}
      className="md:h-[565px] h-[700px] cursor-grab z-10 relative"
    >
      {dataSlider.map((slide, index) => (
        <SwiperSlide
          key={index}
          className={`h-full bg-cover bg-no-repeat bg-center slide-${index}`}
          style={{ backgroundImage: slide.backgroundImage }}
        >
          <ResponsiveContainer type="slider">
            <div
              className="w-full py-5 md:w-[40%] lg:[50%] flex flex-col gap-5 px-2 text-container"
              ref={(el) => (textContainerRefs.current[index] = el)}
            >
              <h2 className="uppercase text-gray-300 text-[15px] fade-in-up">
                {slide.title}
              </h2>
              <p className="lg:text-[40px] text-[25px] font-bold text-white fade-in-up">
                {slide.description}
              </p>
              <p className="text-[14px] text-gray-300 hidden md:inline-block fade-in-up">
                {slide.details}
              </p>
              <button className="uppercase w-fit border px-4 py-2 border-white-1 text-white text-[12px] md:text-[16px] fade-in-up">
                Read More
              </button>
            </div>
            <img
              src={slide.imageSrc}
              alt={slide.title}
              className={`scale-in ${slide.imageClass} ${
                isVisible ? "visible" : "invisible"
              }`}
              ref={(el) => (imageRefs.current[index] = el)}
            />
          </ResponsiveContainer>
        </SwiperSlide>
      ))}
      <div className="swiper-button-next"></div>
      <div className="swiper-button-prev"></div>
    </Swiper>
  );
}

export default MainSlider;
