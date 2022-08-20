import LoginForm from "@domain/login/components/LoginForm";
import useUsers from "@domain/login/hooks/use-user.hook";
import { styled } from "@stitches/react";

export default function Login() {
  const [users] = useUsers();

  return (
    <Container>
      <LoginForm
        users={users}
        onSuccess={(user) => alert(JSON.stringify(user))}
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
