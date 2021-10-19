import React from "react";
import styled from "styled-components";

const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: "white";
`;

const Section = (props) => {
  const { section } = props;

  return <Container>{section.title}</Container>;
};

export default Section;
