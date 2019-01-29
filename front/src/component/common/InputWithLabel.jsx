import React from 'react';
import styled from 'styled-components';

// 두개가 함께 있을땐 상단 (그 사이) 에 여백을 준다
const Wrapper = styled.div`
  & + & {
    margin-top: 0.8rem;
    margin-bottom: 0.8rem;
  }
`;

const Label = styled.div`
  text-align: left;
  font-size: 0.7rem;
  font-weight: bold;
  color: #000000;
  margin-bottom: 0.25rem;
  margin-right: 4rem;
  display: inline-block;
  width: 20%;
`;

const Input = styled.input`
  width: 50%;
  border: 1px solid #c2c2c2;
  outline: none;
  border-radius: 3px;
  height: 2em;
  font-size: 0.7rem;
  padding-left: 0.5rem;
  padding-right: 0.01rem;
  ::placeholder {
    font-size: 0.7rem;
    color: #7d7d7d;
  }
`;

// rest 쪽에는 onChange, type, name, value, placeholder 등의 input 에서 사용 하는 값들을 넣어줄수 있다.
const InputWithLabel = ({ label, ...rest }) => (
  <Wrapper>
    <Label>{label}</Label>
    <Input {...rest} />
  </Wrapper>
);

export default InputWithLabel;
