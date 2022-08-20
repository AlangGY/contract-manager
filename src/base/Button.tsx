import { ReactNode } from "react";

interface Props {
  type?: HTMLButtonElement["type"];
  children: ReactNode;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent) => void;
}

export default function Button({ children, disabled, onClick }: Props) {
  return (
    <button disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
}
