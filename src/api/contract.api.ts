import axios from "axios";
import { Contract } from "@models/types";

interface ContractResponse extends Omit<Contract, "date"> {
  timestamp: number;
}

const getContracts = async (): Promise<Contract[]> => {
  try {
    const response = await axios.get<ContractResponse[]>("/contract");

    return response.data.map(({ id, company, contractor, timestamp }) => ({
      id,
      company,
      contractor,
      date: new Date(timestamp),
    }));
  } catch (e) {
    return [];
  }
};

const ContractAPI = {
  getContracts,
};

export default ContractAPI;
