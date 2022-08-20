import { HEADER_HEIGHT } from "@constants/styles.constant";
import useUsers from "@domain/login/hooks/use-user.hook";
import { styled } from "@stitches/react";
import { Space } from "antd";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import UserNav from "./UserNav";

export default function Header() {
  const [users] = useUsers();

  return (
    <Container>
      <LeftSide>
        <Space>
          <Logo />
          <Nav />
        </Space>
      </LeftSide>
      <RightSide>{users[0] && <UserNav user={users[0]} />}</RightSide>
    </Container>
  );
}

const Container = styled("header", {
  position: "fixed",
  top: 0,
  width: "100%",
  height: HEADER_HEIGHT,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "0 10px 0 10px",
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
