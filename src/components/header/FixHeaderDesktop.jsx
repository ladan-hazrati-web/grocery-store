import { useEffect, useRef, useState, useCallback } from "react";
import Logo from "./Logo";
import Menu from "./Menu";
import IconCart from "./IconCart";
import IconUserAccount from "./IconUserAccount";
import { useSelector } from "react-redux";
import { selectSubtotal } from "../../slices/cartSlice";
import formatUSDT from "../../hooks/formatPrice";

import IconFavorite from "./IconFavorite";

function FixHeaderDesktop() {
  const [isFixed, setIsFixed] = useState(false);

  const prevScrollY = useRef(0); // ذخیره موقعیت قبلی اسکرول
  const subtotal = useSelector(selectSubtotal);

  const handleScroll = useCallback(() => {
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    const scrollTop = document.documentElement.scrollTop;

    if (scrollTop < prevScrollY.current) {
      setIsFixed(true); // اسکرول به سمت بالا
    } else if (scrollTop > prevScrollY.current) {
      setIsFixed(false); // اسکرول به سمت پایین
    }

    prevScrollY.current = scrollTop;

    if (scrollTop + clientHeight >= scrollHeight - 10) {
      setIsFixed(true);
    } else if (scrollTop < 50) {
      setIsFixed(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <div
      className={`lg:block fixed z-20 hidden top-0 left-0 w-full transition-transform duration-300 ease-in-out bg-white ${
        isFixed ? "translate-y-0" : "-translate-y-[100%]"
      }`}
    >
      <div className="flex justify-center">
        <div className="w-full xl:container 2xl:px-[170px] px-5 text-black">
          <div className="flex justify-between items-center py-5">
            <Logo />
            <Menu />
            <div className="flex items-center gap-3 w-[15%] justify-end">
              <IconUserAccount />
              <IconFavorite />
              <IconCart />
              <p className="text-[13px]">{formatUSDT(subtotal)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FixHeaderDesktop;
