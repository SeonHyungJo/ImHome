import React from 'react';
import styled from 'styled-components';

const TitleWrapper = styled.div`
  width: 100%;
  text-align: center;
  border-bottom: 1px solid #c2c2c2;
  min-height: 8vh;
  color: black;
  margin-bottom: 1rem;
`;

const TitleDiv = styled.div`
  font-size: 1.1rem;
  font-weight: bold;
  color: #000000;
`;

const ContentSpan = styled.span`
  font-size: 0.8rem;
  font-weight: bold;
  color: #707070;
`;

const PopUserTitle = ({ title, children }) => (
  <TitleWrapper>
    <TitleDiv>{title}</TitleDiv>
    <ContentSpan>{children}</ContentSpan>
  </TitleWrapper>
);

export default PopUserTitle;
