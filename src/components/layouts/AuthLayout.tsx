import { useAuth } from "hooks";
import { Navigate, Outlet } from "react-router-dom";

export const AuthLayout = () => {
  //const { token } = useSelector((state: RootState) => state.userService);
  const { token } = useAuth();
  if (token) {
    return <Navigate to="/" replace />;
  }
  // if !token (token == null) => return <Login/> 
  return <Outlet/>;
};
