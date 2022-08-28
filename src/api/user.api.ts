import { User } from "@models/types";
import axios from "axios";

const getUsers = async () => {
  try {
    return axios.get<User[] | undefined>("/user").then((res) => {
      if (!res.data) throw new Error("failed to fetch users");
      return res.data;
    });
  } catch (e) {
    return [];
  }
};

const login = async (userName: string, password: string) => {
  if (!userName || !password) throw new Error("failed to login");

  return axios.post<User>("/login", { userName, password }).then((res) => {
    if (!res.data) throw new Error("failed to login");
    return res.data;
  });
};

const UserAPI = {
  getUsers,
  login,
};

export default UserAPI;
