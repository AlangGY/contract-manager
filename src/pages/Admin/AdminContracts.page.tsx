import AdminAPI from "@api/admin.api";
import { ContractList } from "@domain/contracts/components/Contract.view";
import useContracts from "@domain/contracts/hooks/use-contracts.hook";
import { authorizationTokenAtom, loginUserAtom } from "@store/atoms/userAtom";
import { Space, Typography } from "antd";
import { useAtom } from "jotai";
import { useEffect } from "react";

export default function AdminContracts() {
  const [contracts, fetchContracts] = useContracts();
  const [loginUser] = useAtom(loginUserAtom);
  const [authorizationToken] = useAtom(authorizationTokenAtom);

  useEffect(() => {
    authorizationToken && fetchContracts(authorizationToken);
  }, [authorizationToken, fetchContracts]);

  if (!loginUser) {
    return null;
  }

  const handleRemoveContract = (id: string) => {
    authorizationToken &&
      AdminAPI.deleteContract(id, authorizationToken).then(() => {
        fetchContracts(authorizationToken);
      });
  };

  return (
    <>
      <Space
        align="center"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <Typography.Title level={2} style={{ margin: 0 }}>
          계약
        </Typography.Title>
      </Space>
      <ContractList
        isAdmin
        contracts={contracts}
        loginUser={loginUser}
        onRemove={handleRemoveContract}
      />
    </>
  );
}
