import { ContractList } from "@domain/contracts/components/Contract.view";
import useContracts from "@domain/contracts/hooks/use-contracts.hook";

function App() {
  const [contracts, fetchContracts] = useContracts();

  return (
    <div className="App">
      <button onClick={() => fetchContracts()}>새로 고침</button>
      <ContractList contracts={contracts} />
    </div>
  );
}

export default App;
