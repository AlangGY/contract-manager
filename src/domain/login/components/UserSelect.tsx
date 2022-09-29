import { User } from "@models/types";
import { ChangeEvent } from "react";

interface UserListProps {
  users: User[];
  onSelect?: (value: string) => void;
}

export default function UserSelect({ users, onSelect }: UserListProps) {
  const handleChange = (e: ChangeEvent) => {
    if (!(e.target instanceof HTMLInputElement)) return;

    onSelect?.(e.target.value);
  };

  return (
    <ul>
      {users.map((user) => (
        <UserOption onChange={handleChange} {...user} key={user.id} />
      ))}
    </ul>
  );
}

const UserOption = ({
  id,
  isAdmin: admin,
  onChange,
}: User & { onChange?: (e: React.ChangeEvent) => void }) => {
  return (
    <li>
      <label>
        <input onChange={onChange} name="user" type="radio" value={id} />
        {id}
      </label>
    </li>
  );
};
