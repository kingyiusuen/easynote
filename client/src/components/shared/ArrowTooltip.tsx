import React from "react";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import Tooltip, { TooltipProps } from "@mui/material/Tooltip";

const theme = createTheme({
  components: {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: "black",
          color: "white",
          padding: "10px",
          fontSize: "13px",
        },
        tooltipPlacementRight: {
          left: "12px",
        },
        arrow: {
          color: "black",
        },
      },
    },
  },
});

const ArrowTooltip = ({ children, ...props }: TooltipProps) => {
  return (
    <ThemeProvider theme={theme}>
      <Tooltip arrow {...props}>
        <div>{children}</div>
      </Tooltip>
    </ThemeProvider>
  );
};

export default ArrowTooltip;
