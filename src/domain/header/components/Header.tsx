import { grey } from "@ant-design/colors";
import { BODY_PADDING, HEADER_HEIGHT } from "@constants/styles.constant";
import { styled } from "@stitches/react";
import { loginUserAtom } from "@store/atoms/userAtom";
import { Space } from "antd";
import { useAtom } from "jotai";
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo.view";
import UserNav from "./UserNav";

export default function Header() {
  const [loginUser, setLoginUser] = useAtom(loginUserAtom);

  return (
    <Container>
      <LeftSide>
        <Link to="/">
          <Logo />
        </Link>
        <Navigation>
          <Link to="contracts">Contracts</Link>
          <Link to="contracts/new">계약 생성</Link>
        </Navigation>
      </LeftSide>
      <RightSide>
        {loginUser ? (
          <UserNav
            user={loginUser}
            onChangePassword={() => {}}
            onLogout={() => setLoginUser(null)}
          />
        ) : (
          <Link to="/login">로그인</Link>
        )}
      </RightSide>
    </Container>
  );
}

const Container = styled("header", {
  position: "fixed",
  top: 0,
  width: "100%",
  height: HEADER_HEIGHT,
  padding: `0 ${BODY_PADDING}px`,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: "white",
  boxShadow: `0 1px 2px 0px ${grey.primary}`,
});

const LeftSide = styled(Space, {});
const RightSide = styled(Space, {});

const Navigation = ({ children }: { children: ReactNode }) => {
  return <Space>{children}</Space>;
};
