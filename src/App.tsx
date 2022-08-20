import { ContractList } from "@domain/contracts/components/Contract.view";
import useContracts from "@domain/contracts/hooks/use-contracts.hook";
import UserSelect from "@domain/login/components/UserSelect";
import useUsers from "@domain/login/hooks/use-user.hook";

function App() {
  const [contracts, fetchContracts] = useContracts();
  const [users] = useUsers();

  return (
    <div className="App">
      <button onClick={() => fetchContracts()}>새로 고침</button>
      <ContractList contracts={contracts} />

      <UserSelect users={users} />
    </div>
  );
}

export default App;
