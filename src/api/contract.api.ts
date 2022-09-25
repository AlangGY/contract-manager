import axios, { AxiosResponse } from "axios";
import { Contract, ContractRemote } from "@models/types";
import { API_ENDPOINT } from "@constants/api.constant";

type ContractResponse = Omit<Contract, "date"> & { date: number };

const getContracts = async (): Promise<Contract[]> => {
  try {
    const response = await axios.get<
      { contracts: ContractResponse[] } | undefined
    >(`${API_ENDPOINT}/contract`, { withCredentials: true });

    if (!response.data) throw new Error("failed to fetch contract");
    return (
      response.data.contracts.map(({ id, company, contractor, date }) => {
        return {
          id,
          company,
          contractor,
          date: new Date(Number(date)),
        };
      }) || []
    );
  } catch (e) {
    console.error(e);
    return [];
  }
};

const getContractByCompanyName = async (
  companyName: string,
  isExact?: boolean
): Promise<Contract[]> => {
  try {
    const response = await axios.get<
      { contracts: ContractResponse[] } | undefined
    >(
      `${API_ENDPOINT}/contract?keyword=${companyName}${
        isExact ? "&exact=true" : ""
      }`,
      {
        withCredentials: true,
      }
    );

    if (!response.data) throw new Error();

    return (
      response.data.contracts.map(({ id, company, contractor, date }) => {
        return {
          id,
          company,
          contractor,
          date: new Date(Number(date)),
        };
      }) || []
    );
  } catch (e) {
    throw new Error("failed to get contract by keyword");
  }
};

const postContract = async (
  contract: Omit<Contract, "id" | "contractor"> & { contractor: string }
): Promise<string> => {
  try {
    const response = await axios.post<
      string,
      AxiosResponse<string, any>,
      Omit<ContractRemote, "id" | "contractor"> & { contractor: string }
    >(
      `${API_ENDPOINT}/contract`,
      {
        company: contract.company,
        contractor: contract.contractor,
        timestamp: contract.date.getTime().toString(),
      },
      { withCredentials: true }
    );

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
