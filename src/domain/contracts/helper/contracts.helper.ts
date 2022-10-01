import { Contract } from "@models/types";

export const isAdminContract = (contract: Contract) => {
  return contract.contractor.id === "JB컨설팅";
};
