import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { LiaEyeSolid, LiaEyeSlashSolid } from "react-icons/lia";
import { useDispatch, useSelector } from "react-redux";
import {
  loginUser,
  loginWithGitHub,
  setCloseMenuAuth,
} from "../../slices/authSlice";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FaGithub } from "react-icons/fa";

// Yup validation schema
const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email address is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

function Login({ inMenoDropDown }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, loadingGithub, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const submitLoginForm = (data) => {
    dispatch(loginUser({ ...data, rememberMe }));
  };

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(setCloseMenuAuth());
    }
  }, [navigate, isAuthenticated, dispatch]);

  const handleLoginWithGitHub = () => {
    dispatch(loginWithGitHub());
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className={`w-full ${
        inMenoDropDown ? "w-full px-3" : "md:w-[45%] p-10 mx-4"
      } mt-10`}
    >
      <h2 className={`uppercase ${inMenoDropDown ? "hidden" : "block"}`}>
        Login
      </h2>
      <form onSubmit={handleSubmit(submitLoginForm)}>
        <div className="mt-4">
          <label htmlFor="email" className="text-[13px] text-gray-900">
            Email address <span className="text-red-600">*</span>
          </label>
          <br />
          <input
            type="text"
            {...register("email")}
            className={`border-2 ${
              errors.email ? "border-red-500" : "border-gray-200"
            } border-gray-200 py-2 w-full mb-4 px-2 focus:outline-none text-gray-500`}
          />
        </div>
        <div className="relative">
          <label htmlFor="password" className="text-[13px] text-gray-900">
            Password <span className="text-red-600">*</span>
          </label>
          <br />
          <input
            type={showPassword ? "text" : "password"}
            {...register("password")}
            className={`border-2 ${
              errors.password ? "border-red-500" : "border-gray-200"
            } border-gray-200 py-2 w-full mb-4 px-2 focus:outline-none text-gray-500`}
          />
          <button
            type="button"
            className="absolute top-[50%] translate-y-[-35%] right-3 text-gray-500"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <LiaEyeSlashSolid /> : <LiaEyeSolid />}
          </button>
        </div>

        <button
          type="submit"
          className="uppercase text-[14px] mt-4 text-white font-bold py-2 bg-red-600 w-full flex justify-center transition-all duration-300 shadow-sm shadow-red-700 hover:bg-red-700"
        >
          {loading ? <ClipLoader color="white" /> : "Login"}
        </button>

        <div className="flex justify-between mt-4">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              value={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label
              className={`${inMenoDropDown ? "text-[11px]" : "text-[14px]"}`}
            >
              Remember me
            </label>
          </div>
          <p
            className={`text-red-700 cursor-pointer ${
              inMenoDropDown ? "text-[11px]" : "text-[14px]"
            }`}
            onClick={() => {
              navigate("/lostpassword");
              dispatch(setCloseMenuAuth());
            }}
          >
            Lost your password?
          </p>
        </div>

        <div className="w-full">
          <h3
            className={`text-center text-[12px] uppercase my-4 text-gray-800 relative after:content-[' '] after:absolute after:top-[50%] after:translate-y-[-50%] after:right-0 ${
              inMenoDropDown
                ? "after:w-[27%] before:w-[27%]"
                : "after:w-[30%] before:w-[30%]"
            } after:h-[1px] after:bg-gray-100 before:content-[' '] before:absolute before:top-[50%] before:translate-y-[-50%] before:left-0 before:h-[1px] before:bg-gray-100`}
          >
            Or login with
          </h3>

          <button
            onClick={handleLoginWithGitHub}
            type="button"
            className={`bg-gray-500 w-full flex items-center text-[14px] font-bold text-white text-center p-2 ${
              inMenoDropDown ? " mt-3" : "w-[48%]"
            }`}
          >
            <FaGithub size={20} />
            <span className="mx-auto">
              {loadingGithub ? <ClipLoader color="white" /> : "Github"}
            </span>
          </button>
        </div>
      </form>
    </motion.div>
  );
}

export default Login;
