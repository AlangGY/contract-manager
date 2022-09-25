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

const login = async (id: string, password: string) => {
  if (!id || !password) throw new Error("failed to login");

  return axios
    .post<User>(
      `${API_ENDPOINT}/user/login`,
      { id, password },
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
