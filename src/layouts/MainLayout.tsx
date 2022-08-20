import { BODY_PADDING } from "@constants/styles.constant";
import { styled } from "@stitches/react";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <Container>
      <Outlet />
    </Container>
  );
}

const Container = styled("main", {
  width: "100%",
  height: "100%",
  padding: `0 ${BODY_PADDING}px`,
});
