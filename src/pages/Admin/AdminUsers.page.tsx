import AdminAPI from "@api/admin.api";
import Button from "@base/Button";
import Input from "@base/Input";
import ScrollContainer from "@base/ScrollContainer";
import UserSelect from "@domain/login/components/UserSelect";
import useUsers from "@domain/login/hooks/use-user.hook";
import { Space } from "antd";
import { useState } from "react";
import UserRegistration from "./components/UserRegistration";

export default function AdminUsers() {
  const [users, fetchUsers] = useUsers();
  const [selectedUserId, setSelectedUserId] = useState<string>();

  const handleRegister = async (id: string) => {
    const isSuccess = await AdminAPI.addUser(id);
    isSuccess && fetchUsers();
  };

  const [password, setPassword] = useState("");
  const [isChangePasswordLoading, setIsChangePasswordLoading] = useState(false);
  const handleChangePassword = async () => {
    setIsChangePasswordLoading(true);
    selectedUserId &&
      password &&
      (await AdminAPI.changePassword(selectedUserId, password));

    setIsChangePasswordLoading(false);
  };

  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const handleDeleteUser = async () => {
    setIsDeleteLoading(true);
    const isSuccess =
      selectedUserId && (await AdminAPI.removeUser(selectedUserId));
    isSuccess && fetchUsers();
    setIsDeleteLoading(false);
  };

  return (
    <div>
      <h3>유저 등록</h3>
      <UserRegistration onRegister={handleRegister} />
      <h3>유저 관리</h3>
      <Space direction="vertical">
        <ScrollContainer height="250px">
          <UserSelect users={users} onSelect={setSelectedUserId} />
        </ScrollContainer>
        <Space>
          <label>
            <Input
              onChange={(e) => setPassword(e.target.value)}
              disabled={!selectedUserId}
              placeholder="비밀번호"
            />
          </label>
          <Button
            disabled={!selectedUserId || isChangePasswordLoading}
            onClick={handleChangePassword}
          >
            비밀번호 변경
          </Button>
          <Button
            disabled={!selectedUserId || isDeleteLoading}
            onClick={handleDeleteUser}
          >
            유저 삭제
          </Button>
        </Space>
      </Space>
    </div>
  );
}
