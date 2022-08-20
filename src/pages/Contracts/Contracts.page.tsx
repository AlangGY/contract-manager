import Button from "@base/Button";
import Modal from "@base/Modal";
import { ContractList } from "@domain/contracts/components/Contract.view";
import ContractForm from "@domain/contracts/components/ContractForm";
import useContracts from "@domain/contracts/hooks/use-contracts.hook";
import useModalContext from "@src/hooks/use-modalContext.hooks";
import { Space, Typography } from "antd";

export default function Contracts() {
  const [contracts] = useContracts();
  const { isVisible, openModal, closeModal } = useModalContext();

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
      <ContractList contracts={contracts} />
      <Modal withDim visible={isVisible} onClickAway={closeModal}>
        <Space>
          <ContractForm
            onSubmit={async (company, date) => {
              console.log(company);
              console.log(date);
              closeModal();
            }}
          />
        </Space>
      </Modal>
    </>
  );
}
