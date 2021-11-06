import React, { ReactNode } from "react";
import { Paper, Typography } from "@mui/material";

type Props = { title: string; children: ReactNode };

export const Panel = ({ title, children }: Props) => (
  <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
    <Typography component="h2" variant="h6" gutterBottom={true}>
      {title}
    </Typography>
    <div style={{ height: 400, width: "100%" }}>{children}</div>
  </Paper>
);
