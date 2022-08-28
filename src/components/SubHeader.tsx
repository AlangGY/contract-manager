import { HEADER_HEIGHT, SUB_HEADER_HEIGHT } from "@constants/styles.constant";
import { styled } from "@stitches/react";
import { Divider, Space } from "antd";
import { Link } from "react-router-dom";

export default function SubHeader() {
  return (
    <Container>
      <Space align="center">
        <Link to="admin/users">유저 등록 / 관리 / 삭제</Link>
        <Divider type="vertical" />
        <Link to="admin/contracts">계약 관리</Link>
      </Space>
    </Container>
  );
}

const Container = styled("div", {
  position: "fixed",
  top: HEADER_HEIGHT,
  display: "flex",
  width: "100%",
  height: SUB_HEADER_HEIGHT,
  padding: "5px 10px",
  backgroundColor: "rgb(250,250,250)",
  borderBottom: "1px solid rgb(240,240,240)",
});
