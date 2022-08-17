import { User } from "@models/types";
import axios from "axios";

const getUsers = async () => {
  return axios.get<User[]>("/user").then((res) => res.data);
};

const UserAPI = {
  getUsers,
};

export default UserAPI;
