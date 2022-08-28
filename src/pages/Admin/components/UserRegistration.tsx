import Button from "@base/Button";
import Input from "@base/Input";
import { Space, Typography } from "antd";
import { FormEvent, useState } from "react";

interface Props {
  onRegister?: (id: string) => Promise<void>;
}

export default function UserRegistration({ onRegister }: Props) {
  const [userId, setUserId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    userId && (await onRegister?.(userId));
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Space>
        <label>
          <Space>
            <Typography.Text>유저 명</Typography.Text>
            <Input onChange={(e) => setUserId(e.target.value)} />
          </Space>
        </label>
        <Button disabled={!userId || isLoading}>등록</Button>
      </Space>
    </form>
  );
}
