import { grey } from "@ant-design/colors";
import { BODY_PADDING, HEADER_HEIGHT } from "@constants/styles.constant";
import useUsers from "@domain/login/hooks/use-user.hook";
import { styled } from "@stitches/react";
import { loginUserAtom } from "@store/atoms/userAtom";
import { Space } from "antd";
import { useAtom } from "jotai";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import UserNav from "./UserNav";

export default function Header() {
  const [loginUser] = useAtom(loginUserAtom);

  return (
    <Container>
      <LeftSide>
        <Space>
          <Logo />
          <Nav />
        </Space>
      </LeftSide>
      <RightSide>
        {loginUser ? (
          <UserNav user={loginUser} />
        ) : (
          <Link to="/login">Login</Link>
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

const LeftSide = styled("div", {});
const RightSide = styled("div", {});

const Nav = () => {
  return (
    <Space>
      <Link to="contracts">Contracts</Link>
      <Link to="contracts/new">계약 생성</Link>
    </Space>
  );
};
