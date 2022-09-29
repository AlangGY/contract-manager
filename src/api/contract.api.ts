import axios, { AxiosResponse } from "axios";
import { Contract, ContractRemote } from "@models/types";
import { API_ENDPOINT } from "@constants/api.constant";

type ContractResponse = Omit<Contract, "date"> & { timestamp: number };

const getContracts = async (token: string): Promise<Contract[]> => {
  try {
    const response = await axios.get<
      { contracts: ContractResponse[] } | undefined
    >(`${API_ENDPOINT}/contract`, {
      withCredentials: true,
      headers: {
        Authorization: token,
      },
    });

    if (!response.data) throw new Error("failed to fetch contract");
    return (
      response.data.contracts.map(({ id, company, contractor, timestamp }) => {
        return {
          id,
          company,
          contractor,
          date: new Date(Number(timestamp)),
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
  token: string,
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
        headers: {
          Authorization: token,
        },
      }
    );

    if (!response.data) throw new Error();

    return (
      response.data.contracts.map(
        ({ id, company, contractor, timestamp: date }) => {
          return {
            id,
            company,
            contractor,
            date: new Date(Number(date)),
          };
        }
      ) || []
    );
  } catch (e) {
    throw new Error("failed to get contract by keyword");
  }
};

const postContract = async (
  contract: Omit<Contract, "id" | "contractor"> & { contractor: string },
  token: string
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
      {
        withCredentials: true,
        headers: {
          Authorization: token,
        },
      }
    );

    if (!response.data) throw new Error("failed to post contract");

    return "success";
  } catch (e) {
    throw new Error("failed to post contract");
  }
};

const deleteContract = async (id: string, token: string) => {
  const response = await axios.delete(`${API_ENDPOINT}/contract?id=${id}`, {
    withCredentials: true,
    headers: {
      Authorization: token,
    },
  });

  if (!response.data) throw new Error("failed to delete contract");

  return "success";
};

const ContractAPI = {
  getContracts,
  getContractByCompanyName,
  postContract,
  deleteContract,
};

export default ContractAPI;
