import * as React from "react";
import Tooltip from "@mui/material/Tooltip";
import Stack from "@mui/material/Stack";
import "./App.css";

export default function NonInteractiveTooltips({ title, children }) {
  return (
    <Tooltip disableInteractive title={title} arrow>
      {children}
    </Tooltip>
  );

  // return <Tooltip disableInteractive>{title}</Tooltip>;
}
