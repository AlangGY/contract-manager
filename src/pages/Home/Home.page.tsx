import { HEADER_HEIGHT } from "@constants/styles.constant";
import Header from "@domain/header/Header";
import { styled } from "@stitches/react";
import { Outlet } from "react-router-dom";

export default function Home() {
  return (
    <Container>
      <Header />
      <Outlet />
    </Container>
  );
}

const Container = styled("div", {
  paddingTop: HEADER_HEIGHT,
  width: "100%",
  height: "100%",
});
