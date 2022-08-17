import { useCallback, useEffect, useState } from "react";
import ContractAPI from "../../api/contract.api";
import { Contract } from "../../types/types";

export default function useContracts(): [Contract[], () => void] {
  const [contracts, setContracts] = useState<Contract[]>([]);

  const fetchContracts = useCallback(() => {
    ContractAPI.getContracts().then((contracts) => {
      setContracts(contracts);
    });
  }, []);

  useEffect(() => {
    fetchContracts();
  }, [fetchContracts]);

  return [contracts, fetchContracts];
}
