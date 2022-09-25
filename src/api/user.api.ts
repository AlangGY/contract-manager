import { API_ENDPOINT } from "@constants/api.constant";
import { User } from "@models/types";
import axios from "axios";

const getUsers = async () => {
  try {
    return axios
      .get<{ users: User[] } | undefined>(`${API_ENDPOINT}/user`, {
        withCredentials: true,
      })
      .then((res) => {
        if (!res.data) throw new Error("failed to fetch users");
        return res.data.users;
      });
  } catch (e) {
    return [];
  }
};

const login = async (userName: string, password: string) => {
  if (!userName || !password) throw new Error("failed to login");

  return axios
    .post<User>(
      `${API_ENDPOINT}/login`,
      { userName, password },
      { withCredentials: true }
    )
    .then((res) => {
      if (!res.data) throw new Error("failed to login");
      return res.data;
    });
};

const UserAPI = {
  getUsers,
  login,
};

export default UserAPI;
