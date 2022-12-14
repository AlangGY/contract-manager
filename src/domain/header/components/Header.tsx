import { BODY_PADDING, HEADER_HEIGHT } from "@constants/styles.constant";
import { styled } from "@stitches/react";
import { loginUserAtom } from "@store/atoms/userAtom";
import { Space } from "antd";
import { useAtom } from "jotai";
import { Link } from "react-router-dom";
import Logo from "./Logo.view";
import UserNav from "./UserNav.view";

export default function Header() {
  const [loginUser, setLoginUser] = useAtom(loginUserAtom);

  return (
    <Container>
      <LeftSide>
        <Link to="/">
          <Logo />
        </Link>
        <Link to="contracts">계약 관리</Link>
      </LeftSide>
      <RightSide>
        {loginUser?.isAdmin && <Link to="admin">관리자 페이지</Link>}
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
  borderBottom: `1px solid rgba(149, 175, 192,.3)`,
});

const LeftSide = styled(Space, {});
const RightSide = styled(Space, {});
