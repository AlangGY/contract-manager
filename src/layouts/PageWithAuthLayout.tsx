import { loginUserAtom } from "@store/atoms/userAtom";
import { useAtom } from "jotai";
import { Navigate, Outlet } from "react-router-dom";

export default function PageWithAuthLayout() {
  const [loginForm] = useAtom(loginUserAtom);

  return (
    <>
      {!loginForm && <Navigate to="login" />}
      <Outlet />
    </>
  );
}
