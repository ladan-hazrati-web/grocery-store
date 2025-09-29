import { FiUser } from "react-icons/fi";
import { LuUserRoundCheck } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import {
  setMessageSuccess,
  setOpenMenuAuth,
  setPage,
} from "../../slices/authSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { setCloseSidebarMenu } from "../../slices/productSlice";

function IconUserAccount({ inFixHeaderMobile, inSidebarMenu }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleClickIcon = () => {
    if (location.pathname === "/auth") {
      dispatch(setOpenMenuAuth());
      dispatch(setCloseSidebarMenu());
    } else if (isAuthenticated) {
      navigate("/dashboard");
      dispatch(setPage("dashboard"));
    } else {
      dispatch(setOpenMenuAuth());
      dispatch(setCloseSidebarMenu());
    }
  };

  useEffect(() => {
    if (isAuthenticated && !sessionStorage.getItem("loginSuccessShown")) {
      dispatch(setMessageSuccess("login successful"));
      sessionStorage.setItem("loginSuccessShown", "true");
    }
  }, [isAuthenticated]);

  return (
    <div
      onClick={handleClickIcon}
      className={`cursor-pointer  ${
        inFixHeaderMobile && " w-1/4 flex flex-col items-center"
      } ${inSidebarMenu && "flex gap-2 items-center"}`}
    >
      {isAuthenticated ? <LuUserRoundCheck size={20} /> : <FiUser size={20} />}
      {inFixHeaderMobile && <p className="text-[12px]">my account</p>}
      {inSidebarMenu && <p className="text-[14px]">my account</p>}
    </div>
  );
}

export default IconUserAccount;
