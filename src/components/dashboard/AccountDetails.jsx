import { useDispatch, useSelector } from "react-redux";
import { supabase } from "../../supabase/supabaseClient";
import { LiaEyeSolid, LiaEyeSlashSolid } from "react-icons/lia";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { setError, setMessageSuccess } from "../../slices/authSlice";
import { ClipLoader } from "react-spinners";
// ساخت schema برای اعتبارسنجی با yup
const schema = yup
  .object({
    currentPassword: yup.string().nullable(),
    newPassword: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .nullable(),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("newPassword"), null], "Passwords must match")
      .nullable(),
  })
  .required();

function AccountDetails() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfrimPassword, setShowConfrimPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const changePassword = async (data) => {
    const { currentPassword, newPassword } = data;

    try {
      setLoading(true); // شروع لودینگ

      // دریافت کاربر از supabase.auth.getUser()
      const { data: session, error: userError } = await supabase.auth.getUser();

      if (userError) {
        dispatch(setError(`Error fetching user: ${userError.message}`));
        return;
      }

      if (session) {
        if (session.user.app_metadata.provider === "github") {
          dispatch(
            setError(
              "please Login to github and in the website github change your password"
            )
          );
          return;
        }

        // بررسی پسورد فعلی کاربر
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: session.user.email,
          password: currentPassword,
        });

        if (signInError) {
          dispatch(setError("Current password is incorrect"));
          return;
        }

        // در صورتی که پسورد فعلی صحیح بود، پسورد جدید را به‌روزرسانی می‌کنیم
        const { error: updateError } = await supabase.auth.updateUser({
          password: newPassword,
        });

        if (updateError) {
          dispatch(setError(`Error changing password: ${updateError.message}`));
        } else {
          dispatch(setMessageSuccess("Password changed successfully!"));
        }
      } else {
        dispatch(setError("User not logged in"));
      }
    } catch (error) {
      // اگر خطایی رخ داد
      dispatch(setError(`Unexpected error: ${error.message}`));
    } finally {
      // بعد از اتمام عملیات، لودینگ را غیرفعال می‌کنیم
      setLoading(false);
    }
  };

  return (
    <>
      <div className="mx-4">
        <div className="flex gap-1">
          <h2 className="text-gray-800 text-[14px]">Display name :</h2>
          <span className="text-[13px] text-gray-500">
            {user?.session?.user?.user_metadata?.user_name ||
              user?.session?.user?.user_metadata?.username}
          </span>
        </div>
        <div className="flex gap-1 mt-5">
          <h2 className="text-gray-800 text-[14px]">Email address:</h2>
          <span className="text-[13px] text-gray-500">
            {user?.session?.user?.user_metadata?.email ||
              user?.session?.user?.user_metadata?.email}
          </span>
        </div>
      </div>
      <div className="w-full border border-gray-200 px-5 py-12 mt-16 relative">
        <div className="mx-4">
          <h2 className="bg-white absolute -top-4 px-3 left-5 font-bold text-[18px]">
            Password change
          </h2>
          <form className="w-full" onSubmit={handleSubmit(changePassword)}>
            <div className="relative">
              <label
                htmlFor="currentPassword"
                className="md:text-[13px] text-[10px] text-gray-900"
              >
                Current password (leave blank to leave unchanged)
              </label>
              <input
                type={showPassword ? "password" : "text"}
                id="currentPassword"
                {...register("currentPassword")}
                className={`border-2 border-gray-200 py-2 w-full mb-4 px-2 focus:outline-none text-gray-500`}
              />
              <button
                type="button"
                className="absolute top-[50%] translate-y-[-35%] right-3 text-gray-500"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <LiaEyeSlashSolid /> : <LiaEyeSolid />}
              </button>
              {errors.currentPassword && (
                <span className="text-red-500 text-sm">
                  {errors.currentPassword.message}
                </span>
              )}
            </div>
            <div className="relative">
              <label
                htmlFor="newPassword"
                className="md:text-[13px] text-[10px] text-gray-900"
              >
                New password (leave blank to leave unchanged)
              </label>
              <input
                type={showNewPassword ? "password" : "text"}
                id="newPassword"
                {...register("newPassword")}
                className={`border-2 border-gray-200 py-2 w-full mb-4 px-2 focus:outline-none text-gray-500`}
              />
              <button
                type="button"
                className="absolute top-[50%] translate-y-[-35%] right-3 text-gray-500"
                onClick={() => setShowNewPassword((prev) => !prev)}
              >
                {showNewPassword ? <LiaEyeSlashSolid /> : <LiaEyeSolid />}
              </button>
              {errors.newPassword && (
                <span className="text-red-500 text-sm">
                  {errors.newPassword.message}
                </span>
              )}
            </div>
            <div className="relative">
              <label
                htmlFor="confirmPassword"
                className="md:text-[13px] text-[10px] text-gray-900"
              >
                Confirm new password
              </label>
              <input
                type={showConfrimPassword ? "password" : "text"}
                id="confirmPassword"
                {...register("confirmPassword")}
                className={`border-2 border-gray-200 py-2 w-full mb-4 px-2 focus:outline-none text-gray-500`}
              />
              <button
                type="button"
                className="absolute top-[50%] translate-y-[-35%] right-3 text-gray-500"
                onClick={() => setShowConfrimPassword((prev) => !prev)}
              >
                {showConfrimPassword ? <LiaEyeSlashSolid /> : <LiaEyeSolid />}
              </button>
              {errors.confirmPassword && (
                <span className="text-red-500 text-sm">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>
            <button
              className="uppercase w-[250px] text-[14px] mt-8 text-white font-bold py-2 bg-red-600 px-8 flex justify-center transition-all duration-300 shadow-sm shadow-red-700 hover:bg-red-700"
              type="submit"
            >
              {loading ? <ClipLoader color="white" /> : "Save Change"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AccountDetails;
