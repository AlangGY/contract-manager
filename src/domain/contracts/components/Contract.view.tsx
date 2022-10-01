import { blue, red } from "@ant-design/colors";
import Button from "@base/Button";
import Input from "@base/Input";
import { Table, Td, Th, THead } from "@base/Table";
import { Contract, User } from "@models/types";
import { dayDiff } from "@util/date.util";
import { Space, Typography } from "antd";
import { isAdminContract } from "../helper/contracts.helper";

const MAX_TIME = 35;

export const ContractItem = ({
  id,
  company,
  contractor,
  date,
  isRemovable,
  onRemove,
  onToggle,
}: Contract & {
  isRemovable?: boolean;
  onRemove?: (contractId: string) => void;
  onToggle?: (contractId: string) => void;
}) => {
  const timePassed = dayDiff(new Date(), date);

  return (
    <tr
      style={
        isAdminContract({ id, company, contractor, date })
          ? { backgroundColor: "rgba(223, 249, 251,1.0)" }
          : {}
      }
    >
      <Td>
        <label>
          <div>
            <Input
              onChange={() => onToggle?.(id)}
              disabled={!isRemovable}
              type="checkbox"
            />
          </div>
        </label>
      </Td>
      <Td style={{ width: "30%" }}>{company}</Td>
      <Td>{contractor?.id}</Td>
      <Td>
        <Space>
          <Typography.Text>{date.toLocaleDateString()}</Typography.Text>
          <Typography.Text
            style={{
              color: timePassed >= MAX_TIME ? red.primary : blue.primary,
            }}
          >
            D{timePassed >= 0 ? "+" : ""}
            {timePassed >= MAX_TIME ? `${timePassed}!` : timePassed}
          </Typography.Text>
        </Space>
      </Td>
      <Td>
        {isRemovable && (
          <Button colorType="alert" onClick={() => onRemove?.(id)}>
            삭제
          </Button>
        )}
      </Td>
    </tr>
  );
};

interface ContractListProps {
  contracts?: Contract[];
  loginUser?: Omit<User, "pw">;
  isAdmin?: boolean;
  onRemove?: (id: string) => void;
  onToggle?: (id: string) => void;
}

export const ContractList = ({
  contracts,
  loginUser,
  isAdmin,
  onRemove,
  onToggle,
}: ContractListProps) => {
  return (
    <Table>
      <THead>
        <tr>
          <Th>선택</Th>
          <Th>업체명</Th>
          <Th>계약자</Th>
          <Th>계약일</Th>
          <Th>삭제 버튼</Th>
        </tr>
      </THead>
      <tbody>
        {contracts &&
          contracts.map((contract) => (
            <ContractItem
              key={contract.id}
              {...contract}
              isRemovable={contract.contractor.id === loginUser?.id || isAdmin}
              onRemove={onRemove}
              onToggle={onToggle}
            />
          ))}
      </tbody>
    </Table>
  );
};
