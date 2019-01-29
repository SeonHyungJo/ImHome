import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  background: white;
  padding: 0 1rem 0.5rem 2rem;
`;

const Title = styled.h3`
  margin-bottom: 20px;
`;

const TitleV2 = styled.span`
  display: inline-block;
  font-size: 1.17em;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-weight: bold;
`;

const SubTitle = styled.span`
  display: inline-block;
  font-size: 1em;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 10px;
  margin-inline-end: 0px;
`;

const ViewWrapper = ({ title, subTitle, children }) => (
  <Wrapper>
    {subTitle === '' || subTitle == null ? (
      <Title>{title}</Title>
    ) : (
      <>
        <TitleV2>{title}</TitleV2>
        <SubTitle>{subTitle}</SubTitle>
      </>
    )}
    {children}
  </Wrapper>
);

export default ViewWrapper;
