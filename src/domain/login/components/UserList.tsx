import { User } from "@models/types";

interface UserListProps {
  users: User[];
}

export default function UserList({ users }: UserListProps) {
  return (
    <ul>
      {users.map((user) => (
        <UserItem {...user} />
      ))}
    </ul>
  );
}

const UserItem = ({ id, name, isAdmin }: User) => {
  return (
    <li>
      <label>
        <input name="user" type="radio" value={name} />
        {name}
      </label>
    </li>
  );
};
