import ContractAPI from "@api/contract.api";
import { Contract } from "@models/types";
import { useCallback, useState } from "react";
import { isAdminContract } from "../helper/contracts.helper";

export default function useContracts(): [Contract[], (token: string) => void] {
  const [contracts, setContracts] = useState<Contract[]>([]);

  const fetchContracts = useCallback((token: string) => {
    ContractAPI.getContracts(token).then((contracts) => {
      setContracts(sortContracts(contracts));
    });
  }, []);

  return [contracts, fetchContracts];
}

const sortContracts = (contracts: Contract[]) => {
  return contracts.sort((a, b) => {
    if (isAdminContract(a) && !isAdminContract(b)) return -1;
    if (isAdminContract(b) && !isAdminContract(a)) return 1;
    return a.date.getTime() - b.date.getTime();
  });
};
