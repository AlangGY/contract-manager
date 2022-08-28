import axios, { AxiosResponse } from "axios";
import { Contract, ContractRemote } from "@models/types";

interface ContractResponse extends Omit<Contract, "date"> {
  timestamp: number;
}

const getContracts = async (): Promise<Contract[]> => {
  try {
    const response = await axios.get<ContractResponse[] | undefined>(
      "/contract"
    );

    if (!response.data) throw new Error("failed to fetch contract");

    return (
      response.data?.map(({ id, company, contractor, timestamp }) => ({
        id,
        company,
        contractor,
        date: new Date(timestamp),
      })) || []
    );
  } catch (e) {
    return [];
  }
};

const getContractByCompanyName = async (
  companyName: string
): Promise<Contract[]> => {
  try {
    const response = await axios.get<ContractResponse[] | undefined>(
      `/contract?keyword=${companyName}`
    );

    return (
      response.data?.map(({ id, company, contractor, timestamp }) => ({
        id,
        company,
        contractor,
        date: new Date(timestamp),
      })) || []
    );
  } catch (e) {
    throw new Error("failed to get contract by keyword");
  }
};

const postContract = async (
  contract: Omit<Contract, "id">
): Promise<string> => {
  try {
    const response = await axios.post<
      string,
      AxiosResponse<string, any>,
      Omit<ContractRemote, "id">
    >("/contract", {
      company: contract.company,
      contractor: contract.contractor,
      timestamp: contract.date.getTime(),
    });

    if (!response.data) throw new Error("failed to post contract");

    return "success";
  } catch (e) {
    throw new Error("failed to post contract");
  }
};

const ContractAPI = {
  getContracts,
  getContractByCompanyName,
  postContract,
};

export default ContractAPI;
