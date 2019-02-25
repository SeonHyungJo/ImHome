import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.button`
  border: 1.5px solid rgba(100, 100, 100, 0.3);
  border-radius: 2px;
  background: white;
  color: #000;
  padding: 0.3rem 0.6rem;
  margin: 0px 1px;

  text-align: center;
  font-size: 0.8rem;
  font-weight: bold;
  cursor: pointer;

  &.on {
    background-color: #fe4c8d;
    color: #fff;
    border: 1.5px solid rgba(100, 100, 100, 0);
  }

  &.off {
    background-color: rgb(224, 224, 224);
    color: #000;
    border: 1.5px solid rgba(100, 100, 100, 0.3);
  }

  &:active {
    background-color: #fe4c8d;
    color: #fff;
    border: 1.5px solid rgba(100, 100, 100, 0);
  }
`;

const WhiteBtn = ({
  children, onClick, style, disabled,
}) => (
  <Wrapper className={disabled && 'off'} style={style || {}} onClick={onClick} disabled={disabled}>
    {children}
  </Wrapper>
);

export default WhiteBtn;
