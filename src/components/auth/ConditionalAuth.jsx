import { motion } from "framer-motion";
import Login from "./Login";
import Register from "./Register";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

function ConditionalAuth() {
  const [clickUserLogin, setClickUserLogin] = useState(true);
  const { user } = useSelector((state) => state.auth);
  console.log(user);

  // وقتی کاربر ثبت‌نام کرد، به صفحه لاگین هدایت شود
  useEffect(() => {
    if (user?.user?.role == "authenticated") {
      setClickUserLogin(false); // فرم رو روی لاگین بذاره
    }
  }, [user]);

  return (
    <div className="w-full flex justify-center items-start flex-wrap md:flex-nowrap">
      {clickUserLogin ? <Register /> : <Login inMenoDropDown={false} />}
      <div className="w-full md:w-[45%] flex flex-col text-center items-center md:my-10 md:py-10 px-10 pb-10">
        <h2 className="uppercase">{clickUserLogin ? "Login" : "Register"}</h2>
        <motion.p
          key={clickUserLogin}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-gray-400 text-[14px] mt-8 mb-5"
        >
          {clickUserLogin
            ? "Login here by filling your username and password or use your favorite social network account."
            : "Registering allows you to access your order status and history."}
        </motion.p>
        <button
          onClick={() => setClickUserLogin((x) => !x)}
          className="w-fit uppercase bg-gray-100 py-2 px-4 text-[12px]"
        >
          {clickUserLogin ? "Login" : "Register"}
        </button>
      </div>
    </div>
  );
}

export default ConditionalAuth;
