import { useEffect, useState } from "react";
import { supabase } from "../supabase/supabaseClient";
import { useDispatch } from "react-redux";
import { setError, setMessageSuccess } from "../slices/authSlice";
import ResponsiveContainer from "../components/responsive/ResponsiveContainer";
import { useNavigate } from "react-router-dom";

function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [showInput, setShowInput] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event) => {
        if (event === "PASSWORD_RECOVERY") {
          setShowInput(true);
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleResetPassword = async () => {
    if (!newPassword) {
      dispatch(setMessageSuccess("Please enter a new password."));
      return;
    }

    const { data, error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (data) {
      dispatch(setMessageSuccess("Password updated successfully!"));
      navigate("/");
      setShowInput(false);
    }
    if (error) {
      alert();
      dispatch(
        setError(
          "There was an error updating your password: " + " " + error.message
        )
      );
    }
  };

  return (
    <ResponsiveContainer type="section">
      <div className="flex justify-center flex-wrap">
        <h2 className="text-center py-20 w-full">Reset Password</h2>
        {showInput && (
          <div className="pt-5 pb-16 md:w-[50%] ">
            <input
              className={`border-2  border-gray-200 py-2 w-full mb-4 px-2 focus:outline-none text-gray-500`}
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button
              onClick={handleResetPassword}
              className="uppercase text-[14px] mt-4 text-white font-bold py-2 bg-red-600 w-full flex justify-center transition-all duration-300 shadow-sm shadow-red-700 hover:bg-red-700"
            >
              Submit
            </button>
          </div>
        )}
      </div>
    </ResponsiveContainer>
  );
}

export default ResetPassword;
