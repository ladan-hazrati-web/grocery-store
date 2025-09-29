import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCartAfterLogout, setUserId } from "../../slices/cartSlice";
import { logoutUser, setPage } from "../../slices/authSlice";
import { BsCardChecklist } from "react-icons/bs";
import { VscAccount } from "react-icons/vsc";
import { CiHeart } from "react-icons/ci";
import { IoLogOutOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
function MainDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const { user: data } = useSelector((state) => state.auth);

  useEffect(() => {
    if (data?.session?.user?.user_metadata) {
      setUsername(
        data.session.user.user_metadata.user_name ||
          data.session.user.user_metadata.username
      );
    }
  }, [data]);

  return (
    <>
      <p className="text-[16px] text-gray-700">
        Hello <span className="text-gray-500">{username}</span>( not
        <span className="text-gray-500"> {username}? </span>
        <button
          onClick={() => {
            dispatch(logoutUser());
            dispatch(clearCartAfterLogout());
            dispatch(setUserId(null));
            navigate("/");
          }}
        >
          Log out )
        </button>
      </p>
      <p className="text-[16px] text-gray-800 my-4">
        From your account dashboard you can view your recent orders, manage your
        shipping , and edit your password and account details.
      </p>
      <div className="flex justify-between gap-10   flex-wrap  mt-10 ">
        <div
          onClick={() => dispatch(setPage("orders"))}
          className="text-center w-full md:w-[45%]  md:py-8 py-5 flex flex-col justify-center items-center  border border-gray-100 group hover:bg-gray-100 transition-all duration-200 shadow-sm shadow-gray-300 cursor-pointer"
        >
          <BsCardChecklist
            size={60}
            className="text-gray-300 group-hover:text-red-700 transition-all duration-200"
          />
          <p className="mt-2 text-gray-900">Orders</p>
        </div>
        <div
          onClick={() => dispatch(setPage("accountDetails"))}
          className="text-center w-full md:w-[45%]  md:py-8 py-5 flex flex-col justify-center items-center  border border-gray-100 group hover:bg-gray-100 transition-all duration-200 shadow-sm shadow-gray-300 cursor-pointer"
        >
          <VscAccount
            size={60}
            className="text-gray-300 group-hover:text-red-700 transition-all duration-200"
          />
          <p className="mt-2 text-gray-900">Account Details</p>
        </div>
        <div
          onClick={() => dispatch(setPage("wishlist"))}
          className="text-center w-full md:w-[45%]  md:py-8 py-5 flex flex-col justify-center items-center  border border-gray-100 group hover:bg-gray-100 transition-all duration-200 shadow-sm shadow-gray-300 cursor-pointer"
        >
          <CiHeart
            size={60}
            className="text-gray-300 group-hover:text-red-700 transition-all duration-200"
          />
          <p className="mt-2 text-gray-900">Wishlist</p>
        </div>
        <div
          onClick={() => {
            dispatch(logoutUser());
            dispatch(clearCartAfterLogout());
            dispatch(setUserId(null));
            navigate("/");
          }}
          className="text-center w-full md:w-[45%]  md:py-8 py-5 flex flex-col justify-center items-center  border border-gray-100 group hover:bg-gray-100 transition-all duration-200 shadow-sm shadow-gray-300 cursor-pointer"
        >
          <IoLogOutOutline
            size={60}
            className="text-gray-300 group-hover:text-red-700 transition-all duration-200"
          />
          <p className=" mt-2  text-gray-900">Logout</p>
        </div>
      </div>
    </>
  );
}

export default MainDashboard;
