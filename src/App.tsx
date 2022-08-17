import { ContractList } from "./contracts/components/Contract.view";
import useContracts from "./contracts/hooks/use-contracts.hook";

function App() {
  const [contracts] = useContracts();

  return (
    <div className="App">
      <ContractList contracts={contracts} />
    </div>
  );
}

export default App;
