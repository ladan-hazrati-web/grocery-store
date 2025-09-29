import { IoMdMenu } from "react-icons/io";
import IconCart from "./IconCart";
import Logo from "./Logo";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setOpenSidebarMenu } from "../../slices/productSlice";

function MobileHeader() {
  const [isFixed, setIsFixed] = useState(true);
  const prevScrollY = useRef(0);
  const dispatch = useDispatch();
  const ticking = useRef(false); // جلوگیری از اجرای بیش از حد تابع

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(() => {
          const scrollTop = document.documentElement.scrollTop;

          // فقط وقتی مقدار جدید تغییر کرد، استیت رو آپدیت کن
          setIsFixed((prev) => {
            if (scrollTop < prevScrollY.current) return true;
            if (scrollTop > prevScrollY.current) return false;
            return prev; // تغییری نکنه اگه مقدار یکسانه
          });

          prevScrollY.current = scrollTop;
          ticking.current = false;
        });

        ticking.current = true;
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`lg:hidden block fixed z-20 top-0 left-0 w-full transition-transform duration-300 ease-in-out bg-white ${
        isFixed ? "translate-y-0" : "-translate-y-[100%]"
      }`}
    >
      <div className="flex justify-between items-center px-4 py-2 w-full bg-white">
        <button onClick={() => dispatch(setOpenSidebarMenu())}>
          <IoMdMenu size={25} />
        </button>
        <Logo />
        <IconCart />
      </div>
    </div>
  );
}

export default MobileHeader;
