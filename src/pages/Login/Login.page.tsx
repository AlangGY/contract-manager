import LoginForm from "@domain/login/components/LoginForm";
import useUsers from "@domain/login/hooks/use-user.hook";
import { authorizationTokenAtom, loginUserAtom } from "@store/atoms/userAtom";
import { styled } from "@stitches/react";
import { useAtom } from "jotai";
import { Navigate } from "react-router-dom";

export default function Login() {
  const [users] = useUsers();
  const [loginUser, setLoginUser] = useAtom(loginUserAtom);
  const [, setAuthorizationToken] = useAtom(authorizationTokenAtom);

  const handleLoginSuccess = (userId: string, token: string) => {
    setLoginUser({
      id: userId,
      isAdmin: !!users.find((user) => user.id === userId)?.isAdmin,
    });
    setAuthorizationToken(token);
  };

  return (
    <Container>
      {loginUser && <Navigate to="/" />}
      <LoginForm
        users={users}
        onSuccess={(userId, token) => {
          handleLoginSuccess(userId, token);
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
