import { loginUserAtom } from "@store/atoms/userAtom";
import { useAtom } from "jotai";
import { Navigate, Outlet } from "react-router-dom";

export default function PageWithAdminLayout() {
  const [loginUser] = useAtom(loginUserAtom);

  return <>{!loginUser?.isAdmin ? <Navigate to="login" /> : <Outlet />}</>;
}
