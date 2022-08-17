import { Contract } from "../../types/types";

export const ContractItem = ({ id, company, contractor, date }: Contract) => {
  return (
    <tr>
      <td>{company.name}</td>
      <td>{contractor.name}</td>
      <td>{date.toLocaleString()}</td>
    </tr>
  );
};

interface ContractListProps {
  contracts?: Contract[];
}

export const ContractList = ({ contracts }: ContractListProps) => {
  return (
    <table>
      <thead>
        <tr>
          <th>업체명</th>
          <th>계약자</th>
          <th>계약일</th>
        </tr>
      </thead>
      <tbody>
        {contracts &&
          contracts.map((contract) => <ContractItem {...contract} />)}
      </tbody>
    </table>
  );
};
