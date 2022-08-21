import { blue, red } from "@ant-design/colors";
import { Table, Td, Th, THead } from "@base/Table";
import { Contract } from "@models/types";
import { dayDiff } from "@util/date.util";
import { Space, Typography } from "antd";

export const ContractItem = ({ company, contractor, date }: Contract) => {
  const timePassed = dayDiff(new Date(), date);

  return (
    <tr>
      <Td style={{ width: "30%" }}>{company.name}</Td>
      <Td>{contractor.name}</Td>
      <Td>
        <Space>
          <Typography.Text>{date.toLocaleDateString()}</Typography.Text>
          <Typography.Text
            style={{ color: timePassed >= 80 ? red.primary : blue.primary }}
          >
            D{timePassed >= 0 ? "+" : ""}
            {timePassed}
          </Typography.Text>
        </Space>
      </Td>
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
