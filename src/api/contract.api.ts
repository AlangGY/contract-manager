import axios from "axios";
import { Contract } from "../types/types";

interface ContractResponse extends Omit<Contract, "date"> {
  timestamp: number;
}

const getContracts = async (): Promise<Contract[]> => {
  const response = await axios.get<ContractResponse[]>("/contract");

  return response.data.map(({ id, company, contractor, timestamp }) => ({
    id,
    company,
    contractor,
    date: new Date(timestamp),
  }));
};

const ContractAPI = {
  getContracts,
};

export default ContractAPI;
