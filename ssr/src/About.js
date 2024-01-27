import React, { Suspense } from "react";
import styled from "styled-components";

const Title = styled.h1`
  font-weight: 800;
`

const Member = styled.p`
  font-weight: 500;
`

const About = () => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Title>About our team</Title>
      <Member>Saheb Giri</Member>
    </Suspense>
  );
};
export default About;
