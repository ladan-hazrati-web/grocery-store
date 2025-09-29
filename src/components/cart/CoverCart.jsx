import { Link, useLocation } from "react-router-dom";
import imgCover from "../../assets/images/auth/page-title-shop.jpg";
import { useEffect, useState } from "react";
function Cover() {
  const location = useLocation();
  const [isActive, setIsActive] = useState("");
  useEffect(() => {
    if (location.pathname === "/cart") {
      setIsActive("cart");
    } else if (location.pathname === "/checkout") {
      setIsActive("checkout");
    } else {
      setIsActive("order");
    }
  }, []);
  const border =
    "border-5 border-b border-red-500 border-t-0 border-l-0 border-r-0 ";
  return (
    <figure className="w-full relative lg:h-[300px]">
      <img src={imgCover} alt="" className="object-cover w-full h-full" />
      <figcaption className="absolute text-white h-full w-full flex flex-col items-center top-5 justify-center">
        <div className="flex text-[12px] md:text-[25px] mt-2">
          <span
            className={`mr-1 inline-block uppercase   ${
              isActive === "cart"
                ? border + " " + "text-white"
                : "text-gray-200 hover:text-white"
            }`}
          >
            <Link to="/cart"> Shopping Cart </Link>
          </span>
          <span
            className={`mr-1 inline-block  uppercase ${
              isActive === "checkout"
                ? border + " " + "text-white"
                : "text-gray-200 hover:text-white"
            }`}
          >
            <Link to="/checkout">/ Checkout</Link>
          </span>
          <button
            className={`mr-1 disabled  inline-block uppercase ${
              isActive === "order"
                ? border + " " + "text-white"
                : "text-gray-200 hover:text-white"
            }`}
          >
            / Order Complete
          </button>
        </div>
      </figcaption>
    </figure>
  );
}

export default Cover;
