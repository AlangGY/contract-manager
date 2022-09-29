import { User } from "@models/types";
import UserAPI from "@api/user.api";
import { useState } from "react";
import { styled } from "@stitches/react";
import { Space, Typography } from "antd";
import ScrollContainer from "@base/ScrollContainer";
import UserSelect from "./UserSelect";
import Button from "@base/Button";

interface Props {
  users: User[];
  onSuccess?: (userId: string, token: string) => void;
  onFail?: (errorMessage: string) => void;
}

export default function LoginForm({ users, onSuccess, onFail }: Props) {
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser) return;

    setIsLoading(true);
    await UserAPI.login(selectedUser, password)
      .then((token) => {
        onSuccess?.(selectedUser, token);
      })
      .catch(() => {
        onFail?.("failed to login");
      });

    setPassword("");
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <Space direction="vertical" align="center" size={20}>
          <Space direction="vertical">
            <Typography.Title level={5}>유저</Typography.Title>
            <ScrollContainer height="130px" width="180px">
              <UserSelect onSelect={setSelectedUser} users={users} />
            </ScrollContainer>
            <label>
              <Typography.Title level={5}>비밀번호</Typography.Title>
              <input
                type="password"
                disabled={!selectedUser}
                placeholder={selectedUser ? "비밀번호" : "유저를 선택하세요"}
                value={password}
                onInput={(e) => {
                  if (!(e.target instanceof HTMLInputElement)) return;
                  setPassword(e.target.value);
                }}
              />
            </label>
          </Space>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "로그인 중..." : "로그인"}
          </Button>
        </Space>
      </Card>
    </form>
  );
}

const Card = styled("div", {
  width: 200,
  border: "1px solid black",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "10px",
});
