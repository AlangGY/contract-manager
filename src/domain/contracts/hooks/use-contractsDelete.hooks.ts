import { useState } from "react";

export default function useContractDelete({
  onDelete,
}: {
  onDelete: (id: string) => Promise<any>;
}) {
  const [selectedContractIds, setSelectedContractIds] = useState<{
    [key: string]: boolean;
  }>({});

  const handleToggleContract = (id: string) => {
    setSelectedContractIds((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const handleRemoveContract = async (id: string) => {
    return onDelete(id);
  };

  const handleRemoveContracts = async () => {
    return Promise.all(
      Object.entries(selectedContractIds)
        .filter(([k, v]) => v)
        .map(([k]) => k)
        .map(handleRemoveContract)
    );
  };

  return {
    hasSelectedContracts:
      Object.entries(selectedContractIds).filter(([k, v]) => v).length > 0,
    handleToggleContract,
    handleRemoveContract,
    handleRemoveContracts,
  };
}
