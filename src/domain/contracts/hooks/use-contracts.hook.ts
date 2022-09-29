import ContractAPI from "@api/contract.api";
import { Contract } from "@models/types";
import { useCallback, useState } from "react";

export default function useContracts(): [Contract[], (token: string) => void] {
  const [contracts, setContracts] = useState<Contract[]>([]);

  const fetchContracts = useCallback((token: string) => {
    ContractAPI.getContracts(token).then((contracts) => {
      setContracts(contracts);
    });
  }, []);

  return [contracts, fetchContracts];
}
