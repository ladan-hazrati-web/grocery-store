import { useState } from "react";
import ResponsiveContainer from "../components/responsive/ResponsiveContainer";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../slices/authSlice";
import { ClipLoader } from "react-spinners";
function LostPassword() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  console.log(email);

  const handlePasswordReset = (event) => {
    event.preventDefault();
    dispatch(resetPassword(email));
  };
  return (
    <ResponsiveContainer type="section">
      <div className="flex justify-center">
        <div className="md:w-[50%] py-24 w-[90%]">
          <p className="text-gray-500 text-[16px] mb-5 ">
            Lost your password? Please enter your username or email address. You
            will receive a link to create a new password via email.
          </p>
          <form action="" onSubmit={handlePasswordReset}>
            <label htmlFor="email" className="text-[13px] text-gray-900">
              Email address <span className="text-red-600">*</span>
            </label>
            <input
              value={email}
              type="text"
              className={`border-2  border-gray-200 py-2 w-full mb-4 px-2 focus:outline-none text-gray-500`}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              type="submit"
              className="uppercase text-[14px] mt-4 text-white font-bold py-2 bg-red-600 w-full flex justify-center transition-all duration-300 shadow-sm shadow-red-700 hover:bg-red-700"
            >
              {loading ? <ClipLoader color="white" /> : "reset password"}
            </button>
          </form>
        </div>
      </div>
    </ResponsiveContainer>
  );
}

export default LostPassword;
