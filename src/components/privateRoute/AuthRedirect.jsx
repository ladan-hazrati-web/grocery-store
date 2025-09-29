import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
function AuthRedirect({ element }) {
  const { isAuthenticated } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return element;
  }

  return <Navigate to="/dashboard" replace />;
}

export default AuthRedirect;
