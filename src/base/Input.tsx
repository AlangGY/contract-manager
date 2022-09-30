import { styled } from "@stitches/react";

interface Props {
  type?: HTMLInputElement["type"];
  disabled?: boolean;
  placeholder?: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onInput?: React.FormEventHandler<HTMLInputElement>;
}

export default function Input({
  type,
  disabled,
  placeholder,
  value,
  onChange,
  onInput,
}: Props) {
  return (
    <StyledInput
      type={type}
      disabled={disabled}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onInput={onInput}
    />
  );
}

const StyledInput = styled("input", {
  border: "1px solid rgba(149, 175, 192,1.0)",
  borderRadius: "4px",
  "&:focus": {
    outline: "0.5px solid rgba(149, 175, 192,1.0)",
  },
});
