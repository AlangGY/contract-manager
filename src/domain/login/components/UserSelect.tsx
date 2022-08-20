import { User } from "@models/types";

interface UserListProps {
  users: User[];
}

export default function UserSelect({ users }: UserListProps) {
  return (
    <ul>
      {users.map((user) => (
        <UserOption {...user} />
      ))}
    </ul>
  );
}

const UserOption = ({ id, name, isAdmin }: User) => {
  return (
    <li>
      <label>
        <input name="user" type="radio" value={name} />
        {name}
      </label>
    </li>
  );
};
