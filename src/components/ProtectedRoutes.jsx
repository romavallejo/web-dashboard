
import { Navigate, Outlet } from "react-router-dom";
import { useAuthentication } from "../context/AuthenticationContext";

export default function ProtectedRoute() {
  const { isAuthenticated, loadingTokens } = useAuthentication();


  if (loadingTokens) {
    return <p>Loading...</p>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }


  return <Outlet />;
}
