import { User } from "@models/types";
import axios from "axios";

const getUsers = async () => {
  try {
    return axios.get<User[]>("/user").then((res) => res.data);
  } catch (e) {
    return [];
  }
};

const UserAPI = {
  getUsers,
};

export default UserAPI;
