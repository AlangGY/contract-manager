import ContractAPI from "@api/contract.api";
import Button from "@base/Button";
import Input from "@base/Input";
import { styled } from "@stitches/react";
import { Divider, Space, Typography } from "antd";
import React, { FormEventHandler, useState } from "react";

interface Props {
  onSubmit?: (company: string, date: Date) => Promise<void>;
}

export default function ContractForm({ onSubmit }: Props) {
  const [company, setCompany] = useState<string>("");
  const [date, setDate] = useState<Date | null>(null);

  const handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault();
    if (!company || !date) return;
    await onSubmit?.(company, date);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Space direction="vertical" style={{ padding: 20 }}>
        <ContractCompanyInput
          value={company}
          onChange={(value) => setCompany(value)}
        />
        <Divider />
        <ContractDateSelect onSelect={setDate} />
        <Divider />
        <ButtonContainer>
          <Button disabled={!company}>등록</Button>
        </ButtonContainer>
      </Space>
    </form>
  );
}

const ContractDateContainer = styled("div", {
  width: 300,
});

const ButtonContainer = styled("div", {
  display: "flex",
  justifyContent: "flex-end",
});

interface CompanyInputProps {
  value: string;
  onChange?: (value: string) => void;
}

function ContractCompanyInput({ value, onChange }: CompanyInputProps) {
  const [isValidated, setIsValidated] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsValidated(false);
    setError(null);
    onChange?.(e.target.value);
  };

  const handleValidate = async () => {
    ContractAPI.getContractByCompanyName(value).then((contract) => {
      setIsValidated(contract.length === 0);
      setError(contract.length > 0 ? "이미 계약된 회사입니다" : null);
    });
  };

  return (
    <label>
      <Space direction="vertical">
        <Typography.Title level={5}>계약 회사</Typography.Title>
        <Space>
          <Input value={value} onChange={handleChange} />
          <Button disabled={isValidated} onClick={handleValidate}>
            {isValidated ? "완료" : "계약 여부 확인"}
          </Button>
        </Space>
        {isValidated ? (
          <Typography.Text type="success">
            계약 가능한 회사입니다
          </Typography.Text>
        ) : (
          error && <Typography.Text type="danger">{error}</Typography.Text>
        )}
      </Space>
    </label>
  );
}

interface DateSelectProps {
  onSelect?: (date: Date | null) => void;
}

function ContractDateSelect({ onSelect }: DateSelectProps) {
  return (
    <ContractDateContainer>
      <Typography.Title level={5}>계약 일자</Typography.Title>
      <input
        type="date"
        onChange={(e) => onSelect?.(e.target.valueAsDate as Date)}
      />
      {/* <Calendar fullscreen={false} onSelect={(e) => onSelect?.(e.toDate())} /> */}
    </ContractDateContainer>
  );
}
