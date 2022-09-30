import ContractAPI from "@api/contract.api";
import Button from "@base/Button";
import Modal from "@base/Modal";
import { ContractList } from "@domain/contracts/components/Contract.view";
import ContractForm from "@domain/contracts/components/ContractForm";
import useContracts from "@domain/contracts/hooks/use-contracts.hook";
import useModalContext from "@src/hooks/use-modalContext.hooks";
import { authorizationTokenAtom, loginUserAtom } from "@store/atoms/userAtom";
import { Space, Typography } from "antd";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";

export default function Contracts() {
  const [contracts, fetchContracts] = useContracts();
  const [loginUser] = useAtom(loginUserAtom);
  const [authorizationToken] = useAtom(authorizationTokenAtom);
  const { isVisible, openModal, closeModal } = useModalContext();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedContractIds, setSelectedContractIds] = useState<{
    [key: string]: boolean;
  }>({});

  useEffect(() => {
    authorizationToken && fetchContracts(authorizationToken);
  }, [authorizationToken, fetchContracts]);

  if (!loginUser) {
    return null;
  }

  const handleToggleContract = (id: string) => {
    setSelectedContractIds((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const handleRemoveContract = async (id: string) => {
    return (
      authorizationToken && ContractAPI.deleteContract(id, authorizationToken)
    );
  };

  const handleRemoveContracts = async (ids: string[]) => {
    setIsLoading(true);
    await Promise.all(ids.map(handleRemoveContract));
    setIsLoading(false);
    authorizationToken && fetchContracts(authorizationToken);
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
        <Space>
          <Button
            colorType="alert"
            disabled={
              isLoading ||
              Object.entries(selectedContractIds).filter(([k, v]) => v)
                .length <= 0
            }
            onClick={() =>
              handleRemoveContracts(
                Object.entries(selectedContractIds)
                  .filter(([k, v]) => v)
                  .map(([k]) => k)
              )
            }
          >
            일괄 삭제
          </Button>
          <Button onClick={openModal}>새로운 계약 등록하기</Button>
        </Space>
      </Space>
      <ContractList
        contracts={contracts}
        loginUser={loginUser}
        onRemove={(id) => {
          handleRemoveContract(id).then(
            (res) => authorizationToken && fetchContracts(authorizationToken)
          );
        }}
        onToggle={handleToggleContract}
      />
      <Modal withDim visible={isVisible} onClickAway={closeModal}>
        <Space>
          <ContractForm
            onSubmit={async (companyName, date) => {
              authorizationToken &&
                (await ContractAPI.postContract(
                  {
                    company: companyName,
                    contractor: loginUser.id,
                    date,
                  },
                  authorizationToken
                ));
              authorizationToken && fetchContracts(authorizationToken);
              closeModal();
            }}
          />
        </Space>
      </Modal>
    </>
  );
}
