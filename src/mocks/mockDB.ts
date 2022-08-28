import { ContractRemote, User } from "@models/types";
import contractsMocks from "./__mocks__/contracts.json";
import usersMocks from "./__mocks__/users.json";

const addedContracts: ContractRemote[] = [];
const addedUsers: User[] = [];

export const getContractsDB = () => {
  return [...contractsMocks, ...addedContracts];
};

export const addContract = (contract: ContractRemote) => {
  addedContracts.push(contract);
};

export const getUsersDB = (): User[] => {
  return [...usersMocks, ...addedUsers];
};

export const addUser = (user: User) => {
  addedUsers.push(user);
};

export const removeUserById = (id: string) => {
  const removeIndex = addedUsers.findIndex((user) => user.id === id);
  if (removeIndex >= 0) {
    addedUsers.splice(removeIndex, 1);
  }
};
