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
import { useEffect } from "react";

export default function Contracts() {
  const [contracts, fetchContracts] = useContracts();
  const [loginUser] = useAtom(loginUserAtom);
  const [authorizationToken] = useAtom(authorizationTokenAtom);
  const { isVisible, openModal, closeModal } = useModalContext();

  console.log(authorizationToken);

  useEffect(() => {
    authorizationToken && fetchContracts(authorizationToken);
  }, [authorizationToken, fetchContracts]);

  if (!loginUser) {
    return null;
  }

  const handleRemoveContract = (id: string) => {
    authorizationToken &&
      ContractAPI.deleteContract(id, authorizationToken).then((res) =>
        fetchContracts(authorizationToken)
      );
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
        <Button onClick={openModal}>새로운 계약 등록하기</Button>
      </Space>
      <ContractList
        contracts={contracts}
        contractor={loginUser}
        onRemove={handleRemoveContract}
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
