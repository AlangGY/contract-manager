import { styled } from "@stitches/react";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  width?: string;
  height?: string;
  alwaysShowScroll?: boolean;
}

export default function ScrollContainer({
  children,
  width,
  height,
  alwaysShowScroll,
}: Props) {
  return (
    <Wrapper css={{ width, height }}>
      <Container css={{ overflow: alwaysShowScroll ? "scroll" : "auto" }}>
        {children}
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled("div", {
  overflow: "hidden",
});

const Container = styled("div", {
  width: "100%",
  height: "100%",
});
