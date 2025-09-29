import { motion } from "framer-motion";
import { useState } from "react";
import { LiaEyeSolid, LiaEyeSlashSolid } from "react-icons/lia";
import { useDispatch, useSelector } from "react-redux";
import { signUpUser } from "../../slices/authSlice";
import { ClipLoader } from "react-spinners";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Yup Validation Schema
const schema = yup.object().shape({
  username: yup.string().required("Username is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  // React Hook Form Setup
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const submitRegisterForm = (data) => {
    dispatch(signUpUser(data));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="w-full md:w-[45%] md:my-10 p-10 md:border border-gray-200 md:border-t-0 md:border-l-0 md:border-b-0"
    >
      <h2 className="uppercase">Register</h2>
      <form onSubmit={handleSubmit(submitRegisterForm)}>
        <div className="mt-4">
          <label htmlFor="username" className="text-[13px] text-gray-900">
            Username <span className="text-red-600">*</span>
          </label>
          <br />
          <input
            id="username"
            type="text"
            className={`border-2 ${
              errors.username ? "border-red-500" : "border-gray-200"
            } border-gray-200 py-2 w-full mb-4 px-2 focus:outline-none text-gray-500`}
            {...register("username")}
          />
        </div>

        <div>
          <label htmlFor="email" className="text-[13px] text-gray-900">
            Email address <span className="text-red-600">*</span>
          </label>
          <br />
          <input
            id="email"
            type="text"
            className={`border-2 ${
              errors.email ? "border-red-500" : "border-gray-200"
            } border-gray-200 py-2 w-full mb-4 px-2 focus:outline-none text-gray-500`}
            {...register("email")}
          />
        </div>

        <div className="relative">
          <label htmlFor="password" className="text-[13px] text-gray-900">
            Password <span className="text-red-600">*</span>
          </label>
          <br />
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            className={`border-2 border-gray-200 ${
              errors.password ? "border-red-500" : "border-gray-200"
            } py-2 w-full mb-4 px-2 focus:outline-none text-gray-500`}
            {...register("password")}
          />

          <button
            type="button"
            className="absolute top-[50%] translate-y-[-35%] right-3 text-gray-500"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <LiaEyeSlashSolid /> : <LiaEyeSolid />}
          </button>
        </div>

        <div>
          <span className="text-gray-400 text-[14px]">
            Your personal data will be used to support your experience
            throughout this website, to manage access to your account, and for
            other purposes described in our{" "}
            <span className="text-gray-700 cursor-pointer">Privacy policy</span>
            .
          </span>
        </div>

        <button
          type="submit"
          className="uppercase text-[14px] mt-8 text-white font-bold py-2 bg-red-600 w-full flex justify-center transition-all duration-300 shadow-sm shadow-red-700 hover:bg-red-700"
          disabled={loading}
        >
          {loading ? <ClipLoader color="white" /> : "Register"}
        </button>
      </form>
    </motion.div>
  );
}

export default Register;
