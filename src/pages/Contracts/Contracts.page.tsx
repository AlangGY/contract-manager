import { ContractList } from "@domain/contracts/components/Contract.view";
import useContracts from "@domain/contracts/hooks/use-contracts.hook";

export default function Contracts() {
  const [contracts] = useContracts();
  return (
    <div>
      <h1>계약</h1>
      <ContractList contracts={contracts} />
    </div>
  );
}
