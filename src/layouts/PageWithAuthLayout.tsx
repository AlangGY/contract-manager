import { loginUserAtom } from "@store/atoms/userAtom";
import { useAtom } from "jotai";
import { Navigate, Outlet } from "react-router-dom";

export default function PageWithAuthLayout() {
  const [loginUser] = useAtom(loginUserAtom);

  return <>{!loginUser ? <Navigate to="login" /> : <Outlet />}</>;
}
