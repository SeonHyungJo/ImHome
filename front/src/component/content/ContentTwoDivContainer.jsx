import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  background-color: white;
  min-height: 89.8vh;
  padding-left: 0.5rem;
  color: black;
  z-index: 3;
  float: left;
`;

const HeaderSide = styled.div`
  display: block;
  background: white;
  font-size: 24px;
  padding: 20px 10px;
  font-weight: 800;
`;

const LeftSide = styled.div`
  display: block;
  background: white;
  padding-top: 0.5rem;
  margin-right: 10px;
  float: left;
`;

const RightSide = styled.div`
  display: block;
  background: white;
  padding-top: 0.5rem;
  float: left;
`;

const ContentTwoDivContainer = ({ children }) => (
  <Wrapper>
    {/* header */}
    <HeaderSide>{children[0]}</HeaderSide>
    {/* left side */}
    <LeftSide>{children[1]}</LeftSide>
    {/* right side */}
    <RightSide>{children[2]}</RightSide>
  </Wrapper>
);

export default ContentTwoDivContainer;
