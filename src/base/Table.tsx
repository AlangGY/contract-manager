import { styled } from "@stitches/react";

export const Table = styled("table", {
  width: "100%",
  border: "black 1px solid",
  borderCollapse: "collapse",
  boxSizing: "border-box",
  "> td,th": {
    padding: "5px",
  },
});

export const THead = styled("thead", {
  backgroundColor: "#DDDDDD",
});

export const Th = styled("th", {
  border: "1px solid black",
});

export const Td = styled("td", {
  border: "1px solid black",
  textAlign: "center",
});
