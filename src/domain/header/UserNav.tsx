import { DownOutlined } from "@ant-design/icons";
import { User } from "@models/types";
import { styled } from "@stitches/react";
import { Dropdown, Menu, Space, Typography } from "antd";
import "antd/dist/antd.css";

const menu = (
  <Menu>
    <Menu.Item>
      <Typography.Text>비밀번호 변경하기</Typography.Text>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item>
      <Typography.Text type="danger">로그아웃</Typography.Text>
    </Menu.Item>
  </Menu>
);

interface Props {
  user: User;
}

export default function UserNav({ user }: Props) {
  return (
    <Dropdown
      getPopupContainer={() => document.querySelector("#root") || document.body}
      overlay={menu}
      trigger={["hover"]}
    >
      <Container>
        <Space>
          <Typography.Text>{user.name}</Typography.Text>
          <DownOutlined />
        </Space>
      </Container>
    </Dropdown>
  );
}

const Container = styled("div", {
  cursor: "pointer",
});
