import axios from "axios";

const addUser = async (id: string): Promise<boolean> => {
  try {
    const response = await axios.post("/admin/user", { id });
    if (!response.data) throw new Error("failed to add User");

    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};

const removeUser = async (id: string): Promise<boolean> => {
  try {
    const response = await axios.delete(`/admin/user?id=${id}`);
    if (!response.data || response.status !== 200)
      throw new Error("failed to remove User");

    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};

const changePassword = async (
  id: string,
  password: string
): Promise<boolean> => {
  try {
    const response = await axios.patch("/admin/user/password", {
      userId: id,
      password,
    });
    if (!response.data || response.status !== 200)
      throw new Error("failed to change password");

    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};

const AdminAPI = {
  addUser,
  removeUser,
  changePassword,
};

export default AdminAPI;
