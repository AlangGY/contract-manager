import AdminAPI from "@api/admin.api";
import Button from "@base/Button";
import { ContractList } from "@domain/contracts/components/Contract.view";
import useContracts from "@domain/contracts/hooks/use-contracts.hook";
import useContractDelete from "@domain/contracts/hooks/use-contractsDelete.hooks";
import { authorizationTokenAtom, loginUserAtom } from "@store/atoms/userAtom";
import { Space, Typography } from "antd";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";

export default function AdminContracts() {
  const [contracts, fetchContracts] = useContracts();
  const [loginUser] = useAtom(loginUserAtom);
  const [authorizationToken] = useAtom(authorizationTokenAtom);
  const [isLoading, setIsLoading] = useState(false);

  const {
    hasSelectedContracts,
    handleToggleContract,
    handleRemoveContract,
    handleRemoveContracts,
  } = useContractDelete({
    onDelete: async (id) => {
      return (
        authorizationToken && AdminAPI.deleteContract(id, authorizationToken)
      );
    },
  });

  useEffect(() => {
    authorizationToken && fetchContracts(authorizationToken);
  }, [authorizationToken, fetchContracts]);

  if (!loginUser) {
    return null;
  }

  return (
    <>
      <Space
        align="center"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <Typography.Title level={2} style={{ margin: 0 }}>
          계약
        </Typography.Title>
        <Space>
          <Button
            colorType="alert"
            disabled={isLoading || !hasSelectedContracts}
            onClick={async () => {
              setIsLoading(true);
              await handleRemoveContracts();
              authorizationToken && fetchContracts(authorizationToken);
              setIsLoading(false);
            }}
          >
            일괄 삭제
          </Button>
        </Space>
      </Space>
      <ContractList
        isAdmin
        contracts={contracts}
        loginUser={loginUser}
        onRemove={async (id) => {
          setIsLoading(true);
          await handleRemoveContract(id);
          authorizationToken && fetchContracts(authorizationToken);
          setIsLoading(false);
        }}
        onToggle={handleToggleContract}
      />
    </>
  );
}
