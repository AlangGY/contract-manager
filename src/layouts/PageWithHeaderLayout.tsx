import { HEADER_HEIGHT, SUB_HEADER_HEIGHT } from "@constants/styles.constant";
import Header from "@domain/header/components/Header";
import SubHeader from "@src/components/SubHeader";
import { styled } from "@stitches/react";
import MainLayout from "./MainLayout";

interface Props {
  subHeader?: boolean;
}

export default function PageWithHeaderLayout({ subHeader }: Props) {
  return (
    <Container
      css={{
        paddingTop: subHeader
          ? HEADER_HEIGHT + SUB_HEADER_HEIGHT
          : HEADER_HEIGHT,
      }}
    >
      <Header />
      {subHeader && <SubHeader />}
      <MainLayout />
    </Container>
  );
}

const Container = styled("div", {
  width: "100%",
  height: "100%",
});
