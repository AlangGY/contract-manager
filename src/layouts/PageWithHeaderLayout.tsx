import { HEADER_HEIGHT } from "@constants/styles.constant";
import Header from "@domain/header/components/Header";
import { styled } from "@stitches/react";
import MainLayout from "./MainLayout";

export default function PageWithHeaderLayout() {
  return (
    <Container>
      <Header />
      <MainLayout />
    </Container>
  );
}

const Container = styled("div", {
  paddingTop: HEADER_HEIGHT,
  width: "100%",
  height: "100%",
});
