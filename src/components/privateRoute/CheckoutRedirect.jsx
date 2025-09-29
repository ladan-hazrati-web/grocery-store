import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function CheckoutRedirect({ element }) {
  const { isAuthenticated } = useSelector((state) => state.auth);
  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }
  return element;
}

export default CheckoutRedirect;
