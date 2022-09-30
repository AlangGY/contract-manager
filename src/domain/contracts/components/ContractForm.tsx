import ContractAPI from "@api/contract.api";
import Button from "@base/Button";
import Input from "@base/Input";
import { styled } from "@stitches/react";
import { authorizationTokenAtom } from "@store/atoms/userAtom";
import { Divider, Space, Typography } from "antd";
import { useAtom } from "jotai";
import React, { FormEventHandler, useState } from "react";

interface Props {
  onSubmit?: (company: string, date: Date) => Promise<void>;
}

export default function ContractForm({ onSubmit }: Props) {
  const [authorizationToken] = useAtom(authorizationTokenAtom);

  const [company, setCompany] = useState<string>("");
  const [date, setDate] = useState<Date | null>(null);
  const [isValidated, setIsValidated] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isSubmittable = company && date && isValidated && !error;

  const handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault();
    if (!isSubmittable) return;
    await onSubmit?.(company, date);
  };

  const validateCompany = async (companyName: string) => {
    authorizationToken &&
      ContractAPI.getContractByCompanyName(
        companyName,
        authorizationToken,
        true
      ).then((contract) => {
        setIsValidated(contract.length === 0);
        contract.length > 0
          ? setError("이미 계약된 회사입니다")
          : setError(null);
      });
  };

  console.log(isValidated);

  return (
    <form onSubmit={handleSubmit}>
      <Space direction="vertical" style={{ padding: 20 }}>
        <ContractCompanyInput
          value={company}
          error={error}
          onChange={(value) => {
            setError(null);
            setCompany(value);
            setIsValidated(false);
          }}
          onValidate={validateCompany}
          isValidated={isValidated}
        />
        <Divider />
        <ContractDateSelect onSelect={setDate} />
        <Divider />
        <ButtonContainer>
          <Button disabled={!isSubmittable}>등록</Button>
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
  error: string | null;
  isValidated: boolean;
  onChange?: (value: string) => void;
  onValidate?: (value: string) => void;
}

function ContractCompanyInput({
  value,
  error,
  isValidated,
  onChange,
  onValidate,
}: CompanyInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  return (
    <label>
      <Space direction="vertical">
        <Typography.Title level={5}>계약 회사</Typography.Title>
        <Space>
          <Input value={value} onChange={handleChange} />
          <Button
            colorType="check"
            disabled={isValidated}
            onClick={() => onValidate?.(value)}
          >
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
