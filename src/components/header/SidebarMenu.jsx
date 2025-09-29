import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { setCloseSidebarMenu } from "../../slices/productSlice";
import { useState } from "react";
import Menu from "./Menu";
import IconUserAccount from "./IconUserAccount";
import { GoHeart } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { setError, setPage } from "../../slices/authSlice";

function SidebarMenu() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showContentMenu, setShowContentMenu] = useState("menu"); // حالت پیش‌فرض
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { userId } = useSelector((state) => state.cart);
  const { categories } = useSelector((state) => state.items);

  function navigateToWishlistPage() {
    if (userId && isAuthenticated) {
      navigate("/dashboard");
      dispatch(setPage("wishlist"));
    } else if (!userId || !isAuthenticated) {
      dispatch(setError("Please Login to website"));
      navigate("/auth");
    }
  }

  return (
    <motion.div
      className="fixed right-0 top-0 w-full bg-black bg-opacity-70 h-screen z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={() => dispatch(setCloseSidebarMenu())}
    >
      <motion.div
        className="absolute left-0 top-0 px-0 w-[300px] md:w-[350px] bg-white max-h-screen h-full overflow-y-auto flex flex-col"
        initial={{ x: "-100%" }}
        animate={{ x: "0%" }}
        exit={{ x: "-100%" }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="w-full  flex justify-between ">
          <button
            onClick={() => setShowContentMenu("menu")}
            className={`w-[55%] ${
              showContentMenu === "menu"
                ? "bg-gray-200 text-black border-[2px] border-t-0 border-l-0 border-r-0 border-red-500"
                : "bg-gray-100 text-gray-500 border-none"
            } text-[13px] uppercase bg-gray-100 shadow-inner shadow-gray-200 py-4`}
          >
            Menu
          </button>
          <button
            onClick={() => setShowContentMenu("categories")}
            className={`w-[55%] ${
              showContentMenu === "categories"
                ? "bg-gray-200 text-black border-[2px] border-t-0 border-l-0 border-r-0 border-red-500"
                : "bg-gray-100 text-gray-500 border-none"
            } text-[13px] uppercase bg-gray-100 shadow-inner shadow-gray-200 py-4`}
          >
            Categories
          </button>
        </div>

        {/* content */}
        <div className="overflow-y-auto">
          {showContentMenu === "menu" && (
            <div>
              {<Menu inSidebarMenu={true} />}
              <div className="flex flex-wrap">
                <div
                  onClick={navigateToWishlistPage}
                  className="p-4 cursor-pointer items-center flex gap-2 text-left w-full text-[13px]  border border-t-0 border-l-0 border-r-0 border-gray-200"
                >
                  <GoHeart size={20} />
                  Wishlist
                </div>
                <div className="p-4 flex items-center gap-2 text-left w-full text-[13px]  border border-t-0 border-l-0 border-r-0 border-gray-200">
                  <div className="cursor-pointer">
                    <IconUserAccount inSidebarMenu={true} />
                  </div>
                </div>
              </div>
            </div>
          )}
          {showContentMenu === "categories" && categories.length > 0 && (
            <div className="w-full flex-wrap">
              {categories.map((category, index) => (
                <button
                  className="p-4 flex gap-2 text-left w-full text-[13px]  border border-t-0 border-l-0 border-r-0 border-gray-200"
                  key={index}
                >
                  {category}
                </button>
              ))}
            </div>
          )}
          {showContentMenu === "categories" && categories.length === 0 && (
            <div className="p-4 text-center text-gray-500">
              No categories available
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default SidebarMenu;
