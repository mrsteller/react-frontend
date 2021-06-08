import React from "react";
import { Container, Box } from "@material-ui/core";
import { BlueLayout } from "./blue-layout";

type MainProps = { id?: string };

export const Main = (props: MainProps) => {
  const { id } = props;
  return (
    <BlueLayout>
      <Container>Hi I'm main {id}</Container>
    </BlueLayout>
  );
};

export default Main;
