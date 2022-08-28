import LoginForm from "@domain/login/components/LoginForm";
import useUsers from "@domain/login/hooks/use-user.hook";
import { loginUserAtom } from "@store/atoms/userAtom";
import { styled } from "@stitches/react";
import { useAtom } from "jotai";
import { User } from "@models/types";
import { Navigate } from "react-router-dom";

export default function Login() {
  const [users] = useUsers();
  const [loginUser, setLoginUser] = useAtom(loginUserAtom);

  const handleLoginSuccess = (user: User) => {
    setLoginUser(user);
  };

  return (
    <Container>
      {loginUser && <Navigate to="/" />}
      <LoginForm
        users={users}
        onSuccess={(user) => {
          handleLoginSuccess(user);
        }}
        onFail={(message) => alert(message)}
      />
    </Container>
  );
}

const Container = styled("div", {
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});
