import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  background-color: white;
  min-height: 89.8vh;
  border-bottom: 1px dashed #c2c2c2;
  position: relative;
  color: black;
  z-index: 3;
  float: left;
  background-position: 0 0;
`;

const ContentWrapper = styled.div`
  width: 62rem;
  background: white;
  padding-top: 0.5rem;
`;

const ContentContainer = ({ children }) => (
  <Wrapper>
    <ContentWrapper>{children}</ContentWrapper>
  </Wrapper>
);

export default ContentContainer;
