import { Table, Td, Th, THead } from "../../base/Table";
import { Contract } from "../../types/types";

export const ContractItem = ({ id, company, contractor, date }: Contract) => {
  return (
    <tr>
      <Td style={{ width: "30%" }}>{company.name}</Td>
      <Td>{contractor.name}</Td>
      <Td>{date.toLocaleString()}</Td>
    </tr>
  );
};

interface ContractListProps {
  contracts?: Contract[];
}

export const ContractList = ({ contracts }: ContractListProps) => {
  return (
    <Table>
      <THead>
        <tr>
          <Th>업체명</Th>
          <Th>계약자</Th>
          <Th>계약일</Th>
        </tr>
      </THead>
      <tbody>
        {contracts &&
          contracts.map((contract) => (
            <ContractItem key={contract.id} {...contract} />
          ))}
      </tbody>
    </Table>
  );
};
