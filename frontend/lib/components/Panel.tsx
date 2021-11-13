import React, { ReactNode } from "react";
import { styled, Typography } from "@mui/material";

const Wrapper = styled("div")({
  display: "flex",
  flexDirection: "column",
});

const Content = styled("div")({});

type Props = { title: string; children: ReactNode };
export const Panel = ({ title, children }: Props) => (
  <Wrapper>
    <Typography component="h2" variant="h6" gutterBottom={true}>
      {title}
    </Typography>
    <Content>{children}</Content>
  </Wrapper>
);
