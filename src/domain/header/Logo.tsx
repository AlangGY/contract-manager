import { Typography } from "antd";
import { Link } from "react-router-dom";

import "antd/dist/antd.css";

export default function Logo() {
  return (
    <Link to="/">
      <Typography.Text style={{ cursor: "pointer" }} strong italic>
        JEUS Contract Manager
      </Typography.Text>
    </Link>
  );
}
