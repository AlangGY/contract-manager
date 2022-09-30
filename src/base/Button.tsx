import { styled, CSS } from "@stitches/react";
import { ReactNode } from "react";

interface Props {
  type?: HTMLButtonElement["type"];
  colorType?: "alert" | "check";
  css?: CSS;
  children: ReactNode;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent) => void;
}

export default function Button({
  children,
  colorType,
  css,
  disabled,
  onClick,
}: Props) {
  return (
    <StyledButton
      colorType={colorType}
      css={css}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </StyledButton>
  );
}

const StyledButton = styled("button", {
  border: "none",
  borderRadius: "2px",
  color: "White",
  backgroundColor: "rgba(126, 214, 223,1.0)",
  "&:disabled": {
    backgroundColor: "rgba(126, 214, 223,0.3)",
  },
  "&:hover:not(:disabled)": {
    backgroundColor: "rgba(126, 214, 223,.8)",
  },

  variants: {
    colorType: {
      alert: {
        backgroundColor: "rgba(255, 121, 121,1.0)",
        "&:disabled": {
          backgroundColor: "rgba(255, 121, 121,.3)",
        },
        "&:hover:not(:disabled)": {
          backgroundColor: "rgba(255, 121, 121,.8)",
        },
      },
      check: {
        backgroundColor: "rgba(186, 220, 88,1.0)",
        "&:disabled": {
          backgroundColor: "rgba(186, 220, 88,.3)",
        },
        "&:hover:not(:disabled)": {
          backgroundColor: "rgba(186, 220, 88,.8)",
        },
      },
    },
  },
});
