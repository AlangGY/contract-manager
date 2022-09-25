import ContractAPI from "@api/contract.api";
import { Contract } from "@models/types";
import { useCallback, useState } from "react";

export default function useContracts(): [Contract[], () => void] {
  const [contracts, setContracts] = useState<Contract[]>([]);

  const fetchContracts = useCallback(() => {
    ContractAPI.getContracts().then((contracts) => {
      setContracts(contracts);
    });
  }, []);

  return [contracts, fetchContracts];
}
