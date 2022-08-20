import useClickAway from "@src/hooks/useClickAway";
import { keyframes, styled } from "@stitches/react";
import { ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";

interface Props {
  children?: ReactNode;
  visible?: boolean;
  withDim?: boolean;
  width?: string | number;
  height?: string | number;
  portalTarget?: HTMLElement;
  onClickAway?: () => void;
}

export default function Modal({
  children,
  visible,
  withDim,
  width,
  height,
  portalTarget,
  onClickAway = () => {},
}: Props) {
  const { ref, setActive } = useClickAway<HTMLDivElement>(onClickAway);

  useEffect(() => {
    setActive(!!visible);
  }, [visible, setActive]);

  if (!visible) return null;

  return createPortal(
    <Dim css={{ backgroundColor: withDim ? "rgba(0,0,0,.1)" : "transparent" }}>
      <InnerContainer ref={ref} css={{ width, height }}>
        {children}
      </InnerContainer>
    </Dim>,
    portalTarget || document.body
  );
}

const Dim = styled("div", {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const show = keyframes({
  "0%": { transform: "scale(0)" },
  "100%": { transform: "scale(1)" },
});

const InnerContainer = styled("div", {
  backgroundColor: "white",
  boxShadow: "0 0 3px 1px rgba(0,0,0,0.6)",
  padding: "8px",
  animation: `${show} 200ms ease-in-out`,
});
