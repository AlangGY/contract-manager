import { ContractList } from "@domain/contracts/components/Contract.view";
import useContracts from "@domain/contracts/hooks/use-contracts.hook";
import UserSelect from "@domain/login/components/UserSelect";
import useUsers from "@domain/login/hooks/use-user.hook";
import { Route, Routes } from "react-router-dom";
import Admin from "./pages/Admin/Admin.page";
import AdminContracts from "./pages/Admin/AdminContracts.page";
import AdminUsers from "./pages/Admin/AdminUsers.page";
import Contracts from "./pages/Contracts/Contracts.page";
import ContractsNew from "./pages/Contracts/ContractsNew.page";
import Home from "./pages/Home/Home.page";
import Login from "./pages/Login/Login.page";

function App() {
  const [contracts, fetchContracts] = useContracts();
  const [users] = useUsers();

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="login" element={<Login />} />
          <Route path="contracts" element={<Contracts />}>
            <Route path="new" element={<ContractsNew />} />
          </Route>
        </Route>
        <Route path="/admin" element={<Admin />}>
          <Route path="users" element={<AdminUsers />} />
          <Route path="contracts" element={<AdminContracts />} />
        </Route>
      </Routes>
      <button onClick={() => fetchContracts()}>새로 고침</button>
      <ContractList contracts={contracts} />

      <UserSelect users={users} />
    </div>
  );
}

export default App;
