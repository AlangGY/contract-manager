import { blue, red } from "@ant-design/colors";
import Button from "@base/Button";
import { Table, Td, Th, THead } from "@base/Table";
import { Contract, User } from "@models/types";
import { dayDiff } from "@util/date.util";
import { Space, Typography } from "antd";

export const ContractItem = ({
  id,
  company,
  contractor,
  date,
  isRemovable,
  onRemove,
}: Contract & {
  isRemovable?: boolean;
  onRemove?: (contractId: string) => void;
}) => {
  const timePassed = dayDiff(new Date(), date);

  return (
    <tr>
      <Td style={{ width: "30%" }}>{company}</Td>
      <Td>{contractor?.id}</Td>
      <Td>
        <Space>
          <Typography.Text>{date.toLocaleDateString()}</Typography.Text>
          <Typography.Text
            style={{ color: timePassed >= 80 ? red.primary : blue.primary }}
          >
            D{timePassed >= 0 ? "+" : ""}
            {timePassed}
            {isRemovable && (
              <Button onClick={() => onRemove?.(id)}>삭제</Button>
            )}
          </Typography.Text>
        </Space>
      </Td>
    </tr>
  );
};

interface ContractListProps {
  contracts?: Contract[];
  contractor?: Omit<User, "pw">;
  onRemove?: (id: string) => void;
}

export const ContractList = ({
  contracts,
  contractor,
  onRemove,
}: ContractListProps) => {
  console.log(contracts, contractor);
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
            <ContractItem
              key={contract.id}
              {...contract}
              isRemovable={contract.contractor.id === contractor?.id}
              onRemove={onRemove}
            />
          ))}
      </tbody>
    </Table>
  );
};
