interface Props {
  type?: HTMLInputElement["type"];
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onInput?: React.FormEventHandler<HTMLInputElement>;
}

export default function Input({ type, value, onChange, onInput }: Props) {
  return (
    <input type={type} value={value} onChange={onChange} onInput={onInput} />
  );
}
