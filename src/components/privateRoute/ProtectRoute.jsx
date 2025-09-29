import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

// کامپوننت ProtectRoute برای محافظت از مسیرهای خاص
const ProtectRoute = ({ element }) => {
  // چک کردن اینکه آیا توکن معتبر در کوکی‌ها وجود داره یا نه
  const { isAuthenticated } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  return element;
};

export default ProtectRoute;
