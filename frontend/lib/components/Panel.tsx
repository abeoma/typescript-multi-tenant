import React, { ReactNode } from "react";
import { styled, Typography, Paper } from "@mui/material";

const Wrapper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  display: "flex",
  flexDirection: "column",
}));

const Content = styled("div")({ height: "70vh", width: "100%" });

type Props = { title: string; children: ReactNode };
export const Panel = ({ title, children }: Props) => (
  <Wrapper>
    <Typography component="h2" variant="h6" gutterBottom={true}>
      {title}
    </Typography>
    <Content>{children}</Content>
  </Wrapper>
);
