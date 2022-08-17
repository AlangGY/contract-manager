import UserAPI from "@api/user.api";
import { User } from "@models/types";
import { useCallback, useEffect, useState } from "react";

export default function useUsers(): [User[], () => void] {
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = useCallback(() => {
    UserAPI.getUsers().then((users) => {
      setUsers(users);
    });
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return [users, fetchUsers];
}
