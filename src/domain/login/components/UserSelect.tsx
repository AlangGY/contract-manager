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
  name,
  isAdmin,
  onChange,
}: User & { onChange?: (e: React.ChangeEvent) => void }) => {
  return (
    <li>
      <label>
        <input onChange={onChange} name="user" type="radio" value={name} />
        {name}
      </label>
    </li>
  );
};
