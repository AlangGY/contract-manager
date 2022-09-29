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

const login = async (id: string, password: string): Promise<string> => {
  if (!id) throw new Error("failed to login");

  return axios
    .post<{ authentication: string; message: string }>(
      `${API_ENDPOINT}/user/login`,
      { id, password },
      { withCredentials: true }
    )
    .then((res) => {
      if (!res.data) throw new Error("failed to login");
      return res.data.authentication;
    });
};

const UserAPI = {
  getUsers,
  login,
};

export default UserAPI;
