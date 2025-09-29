import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdOutlineClose } from "react-icons/md";
const Message = () => {
  const dispatch = useDispatch();
  const { messageSuccess, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (messageSuccess || error) {
      const timer = setTimeout(() => {
        dispatch({ type: "auth/clearMessages" });
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [messageSuccess, error, dispatch]);

  return (
    <AnimatePresence>
      {(messageSuccess || error) && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className={`fixed top-20 bg-opacity-80 left-0 right-0 mx-auto w-fit z-50 px-6 py-3 
                 text-white rounded shadow-md text-center 
                 flex justify-center items-center
                 ${messageSuccess && "bg-green-500 shadow-green-900"}
                 ${error && "bg-red-500 shadow-red-900"}
                  `}
        >
          <MdOutlineClose
            className="absolute top-1 right-1 cursor-pointer"
            onClick={() => dispatch({ type: "auth/clearMessages" })}
          />
          <p className="py-2 capitalize">{messageSuccess || error}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Message;
