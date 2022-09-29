import { DownOutlined } from "@ant-design/icons";
import { User } from "@models/types";
import { styled } from "@stitches/react";
import { Dropdown, Menu, Space, Typography } from "antd";
import "antd/dist/antd.css";

interface Props {
  user: Omit<User, "pw">;
  onChangePassword?: () => void;
  onLogout?: () => void;
}

export default function UserNav({ user, onChangePassword, onLogout }: Props) {
  return (
    <Dropdown
      getPopupContainer={() => document.querySelector("#root") || document.body}
      overlay={
        <Menu
          items={[
            { label: "비밀번호 변경하기", key: "0", onClick: onChangePassword },
            { type: "divider" },
            { label: "로그아웃", key: "1", danger: true, onClick: onLogout },
          ]}
        />
      }
      trigger={["hover"]}
    >
      <Container>
        <Space>
          <Typography.Text>
            {user.isAdmin ? "👑" : ""} {user.id}
          </Typography.Text>
          <DownOutlined />
        </Space>
      </Container>
    </Dropdown>
  );
}

const Container = styled("div", {
  cursor: "pointer",
});
