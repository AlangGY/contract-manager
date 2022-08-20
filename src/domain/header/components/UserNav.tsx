import { DownOutlined } from "@ant-design/icons";
import { User } from "@models/types";
import { styled } from "@stitches/react";
import { Dropdown, Menu, Space, Typography } from "antd";
import "antd/dist/antd.css";

interface Props {
  user: User;
  onChangePassword?: () => void;
  onLogout?: () => void;
}

export default function UserNav({ user, onChangePassword, onLogout }: Props) {
  return (
    <Dropdown
      getPopupContainer={() => document.querySelector("#root") || document.body}
      overlay={
        <Menu>
          <Menu.Item onClick={onChangePassword}>
            <Typography.Text>비밀번호 변경하기</Typography.Text>
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item onClick={onLogout}>
            <Typography.Text type="danger">로그아웃</Typography.Text>
          </Menu.Item>
        </Menu>
      }
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
