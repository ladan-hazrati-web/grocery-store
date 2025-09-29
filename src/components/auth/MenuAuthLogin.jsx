import { useEffect, useRef, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { setCloseMenuAuth } from "../../slices/authSlice";
import { IoMdClose } from "react-icons/io";
import { AiOutlineUser } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Login from "./Login";

const MenuAuthLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const { openMenuAuth } = useSelector((state) => state.auth);
  const [shouldDisableScroll, setShouldDisableScroll] = useState(false);

  // تابع بستن منو با useCallback
  const handleClose = useCallback(
    () => dispatch(setCloseMenuAuth()),
    [dispatch]
  );

  useEffect(() => {
    const checkScrollState = () => {
      if (menuRef.current) {
        const willHaveScroll =
          menuRef.current.scrollHeight > window.innerHeight;
        setShouldDisableScroll(willHaveScroll);
        document.body.style.overflow = willHaveScroll ? "hidden" : "auto";
      }
    };

    if (openMenuAuth) {
      checkScrollState();
      window.addEventListener("resize", checkScrollState);
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      window.removeEventListener("resize", checkScrollState);
      document.body.style.overflow = "auto";
    };
  }, [openMenuAuth]);

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-70 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={handleClose}
    >
      <motion.div
        ref={menuRef}
        className="absolute right-0 top-0 w-[300px] md:w-[350px] bg-white h-full overflow-y-auto z-50"
        initial={{ x: "100%" }}
        animate={{ x: "0%" }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between py-4 px-3 border-b border-gray-200">
          <p>Sign in</p>
          <button className="flex items-center gap-1" onClick={handleClose}>
            <IoMdClose />
            <span>Close</span>
          </button>
        </div>

        {/* Login Component */}
        <Login inMenoDropDown={true} />

        {/* Footer */}
        <div className="w-full mt-3 flex flex-col border-t py-3 border-gray-200 items-center">
          <AiOutlineUser size={50} className="text-gray-200" />
          <p className="text-[13px] mt-1">No account yet?</p>
          <button
            className="border text-[12px] uppercase text-gray-700 mt-4 border-t-0 border-r-0 border-l-0 border-red-600"
            onClick={() => {
              navigate("/auth");
              handleClose();
            }}
          >
            Create an Account
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default MenuAuthLogin;
