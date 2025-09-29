import { clearCartAfterLogout, setUserId } from "../slices/cartSlice";
import { logoutUser, setPage } from "../slices/authSlice";
import { useDispatch, useSelector } from "react-redux";

import AccountDetails from "../components/dashboard/AccountDetails";
import AdminComments from "../components/comment/AdminComments";
import Cover from "../components/auth/Cover";
import MainDashboard from "../components/dashboard/MainDashboard";
import Orders from "../components/dashboard/Orders";
import ResponsiveContainer from "../components/responsive/ResponsiveContainer";
import Wishlist from "../components/dashboard/Wishlist";
import { useNavigate } from "react-router-dom";

function DashboardPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { page } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.auth);





  return (
    <>
      <Cover />
      <ResponsiveContainer type="section">
        <div className="w-full flex flex-wrap justify-center md:flex-nowrap mt-16 lg:mt-0">
          <div className="w-full mx-4 md:mx-0 px-5 md:w-[30%] my-10   md:border md:border-t-0 md:border-l-0 md:border-b-0 md:border-gray-200 ">
            <h2 className="border text-[20px] px-4 pb-2 border-t-0 border-l-0 border-r-0 border-gray-300">
              MY ACCOUNT
            </h2>
            <ul>
              <li
                onClick={() => dispatch(setPage("dashboard"))}
                className={`mt-5 p-2   cursor-pointer hover:bg-gray-100 transition-all duration-300 ${page === "dashboard" && "bg-gray-200 hover:bg-gray-200"
                  }`}
              >
                Dashboard
              </li>
              <li
                onClick={() => dispatch(setPage("orders"))}
                className={`mt-5 p-2   cursor-pointer hover:bg-gray-100 transition-all duration-300 ${page === "orders" && "bg-gray-200 hover:bg-gray-200"
                  }`}
              >
                Orders
              </li>
              <li
                onClick={() => dispatch(setPage("accountDetails"))}
                className={`mt-5 p-2    cursor-pointer hover:bg-gray-100 transition-all duration-300 ${page === "accountDetails" && "bg-gray-200 hover:bg-gray-200"
                  }`}
              >
                Account details
              </li>
              <li
                onClick={() => dispatch(setPage("wishlist"))}
                className={`mt-5 p-2 cursor-pointer hover:bg-gray-100 transition-all duration-300 ${page === "wishlist" && "bg-gray-200 hover:bg-gray-200"
                  }`}
              >
                Whishlist
              </li>
              {user?.session?.user?.email === "l.hazrati78@yahoo.com" && (
                <li
                  onClick={() => dispatch(setPage("comment"))}
                  className={`mt-5 p-2 cursor-pointer hover:bg-gray-100 transition-all duration-300 ${page === "comment" && "bg-gray-200 hover:bg-gray-200"
                    }`}
                >
                  manage Comments
                </li>
              )}

              <li
                onClick={() => {
                  dispatch(logoutUser());
                  dispatch(clearCartAfterLogout());
                  dispatch(setUserId(null));
                  navigate("/");
                }}
                className={`mt-5 p-2   cursor-pointer hover:bg-gray-100 transition-all duration-300 `}
              >
                Logout
              </li>
            </ul>
          </div>
          <div className="w-full mx-4 md:mx-0 md:w-[70%] my-10 md:px-10  ">
            {page === "dashboard" && <MainDashboard />}
            {page === "orders" && <Orders />}
            {page === "accountDetails" && <AccountDetails />}
            {page === "wishlist" && <Wishlist />}
            {page === "comment" && <AdminComments />}
          </div>
        </div>
      </ResponsiveContainer>
    </>
  );
}

export default DashboardPage;
// 8161e3ff-5242-4c85-b401-6490dcf8fbd8
