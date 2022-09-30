import { styled } from "@stitches/react";

export const Table = styled("table", {
  width: "100%",
  borderCollapse: "collapse",
  boxSizing: "border-box",
  "> td,th": {
    padding: "5px",
  },
});

export const THead = styled("thead", {
  backgroundColor: "rgba(223, 249, 251,.6)",
});

export const Th = styled("th", {
  border: "0.5px solid rgba(149, 175, 192,1.0)",
});

export const Td = styled("td", {
  border: "0.5px solid rgba(149, 175, 192,1.0)",
  textAlign: "center",
});
