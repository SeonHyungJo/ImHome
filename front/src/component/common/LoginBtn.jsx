import React from 'react';
import styled from 'styled-components';
import { Icon } from 'react-icons-kit';
import { chevronRight } from 'react-icons-kit/fa/chevronRight';

const Wrapper = styled.div`
  margin-top: 5rem;
  margin-left: auto;
  margin-right: auto;
  padding: 0.5rem;

  border-radius: 30px;
  background: white;
  color: #fe4c8d;

  width: 12rem;
  cursor: pointer;
`;

const LoginWrapper = styled.div`
  display: inline-block;
  font-size: 1.1rem;
  font-weight: 700;
  width: 80%;
`;

const Button = ({ children, onClick }) => (
  <Wrapper onClick={onClick}>
    <LoginWrapper>{children}</LoginWrapper>
    <Icon icon={chevronRight} size={8} style={{ verticalAlign: 'top' }} />
  </Wrapper>
);

export default Button;
