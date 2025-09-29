import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CardItem({ title, image, desc, text, textBtn }) {
  const [pos, setPos] = useState({ x: 0, y: 0, scale: 1 });
  const navigate = useNavigate();
  const handleMouseMove = (e) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();

    const x = ((clientX - left) / width - 0.5) * -40; // حرکت خلاف موس در محور X
    const y = ((clientY - top) / height - 0.5) * -40; // حرکت خلاف موس در محور Y
    const scale = 1.15; // مقدار زوم

    setPos({ x, y, scale });
  };

  const handleMouseLeave = () => {
    setPos({ x: 0, y: 0, scale: 1 }); // برگرداندن تصویر به حالت عادی
  };
  return (
    <div className="mx-2 w-full md:w-[50%] cursor-pointer">
      <figure
        className="relative overflow-hidden  "
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ perspective: "500px" }}
      >
        <img
          src={image}
          alt=""
          className="transition-transform duration-100"
          style={{
            transform: `translate(${pos.x}px, ${pos.y}px) scale(${pos.scale})`,
          }}
        />
        <div className="absolute  h-full justify-center flex flex-col gap-2 items-start top-0 left-5 text-white">
          <p className="text-gray-200 text-[14px] text-opacity-60">{text}</p>
          <h2 className="text-[22px] md:text-[30px] font-bold">{title}</h2>
          <p className="text-gray-100 lg:w-[50%]">{desc}</p>
          <button
            className="bg-red-600 px-5 py-3 text-[14px] mt-2 "
            onClick={() => navigate("/shop")}
          >
            {textBtn}
          </button>
        </div>
      </figure>
    </div>
  );
}

export default CardItem;
