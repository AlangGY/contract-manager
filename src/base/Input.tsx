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
    <input
      type={type}
      disabled={disabled}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onInput={onInput}
    />
  );
}
