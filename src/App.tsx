import { styled } from "@stitches/react";
import { Route, Routes } from "react-router-dom";
import PageWithAuthLayout from "./layouts/PageWithAuthLayout";
import MainLayout from "./layouts/MainLayout";
import PageWithHeaderLayout from "./layouts/PageWithHeaderLayout";
import Admin from "./pages/Admin/Admin.page";
import AdminContracts from "./pages/Admin/AdminContracts.page";
import AdminUsers from "./pages/Admin/AdminUsers.page";
import Contracts from "./pages/Contracts/Contracts.page";
import Home from "./pages/Home/Home.page";
import Login from "./pages/Login/Login.page";
import PageWithAdminLayout from "./layouts/PageWithAdminLayout";

function App() {
  return (
    <AppContainer>
      <Routes>
        <Route element={<PageWithHeaderLayout />}>
          <Route path="/" element={<Home />} />
          <Route element={<PageWithAuthLayout />}>
            <Route path="contracts" element={<Contracts />} />
          </Route>
        </Route>
        <Route element={<PageWithHeaderLayout subHeader />}>
          <Route element={<PageWithAdminLayout />}>
            <Route path="/admin" element={<Admin />}>
              <Route path="users" element={<AdminUsers />} />
              <Route path="contracts" element={<AdminContracts />} />
            </Route>
          </Route>
        </Route>
        <Route element={<MainLayout />}>
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </AppContainer>
  );
}

export default App;

const AppContainer = styled("div", {
  width: "100%",
  height: "100%",
});
