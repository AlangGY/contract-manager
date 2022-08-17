import { User } from "@models/types";
import axios from "axios";

const getUsers = async () => {
  try {
    return axios.get<User[]>("/user").then((res) => {
      if (!res.data) throw new Error("failed to fetch users");
      return res.data;
    });
  } catch (e) {
    return [];
  }
};

const UserAPI = {
  getUsers,
};

export default UserAPI;
