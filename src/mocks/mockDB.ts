import { ContractRemote } from "@models/types";
import contractsMocks from "./__mocks__/contracts.json";

const addedContracts: ContractRemote[] = [];

export const getContractsDB = () => {
  return [...contractsMocks, ...addedContracts];
};

export const addContract = (contract: ContractRemote) => {
  addedContracts.push(contract);
};
