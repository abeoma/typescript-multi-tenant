import React, { ReactNode } from "react";
import { styled, Typography } from "@mui/material";

const Wrapper = styled("div")({
  display: "flex",
  flexDirection: "column",
});

const Header = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "flex-start",
  justifyContent: "space-between",
  marginBottom: theme.spacing(1),
}));

const Content = styled("div")({});

type Props = { title: string; actions?: ReactNode[]; children: ReactNode };
export const Panel = ({ title, actions, children }: Props) => (
  <Wrapper>
    <Header>
      <Typography component="h2" variant="h6">
        {title}
      </Typography>
      {actions}
    </Header>
    <Content>{children}</Content>
  </Wrapper>
);
