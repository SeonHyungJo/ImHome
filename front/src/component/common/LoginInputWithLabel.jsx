import React from 'react';
import styled from 'styled-components';
import { Icon } from 'react-icons-kit';
import { userO } from 'react-icons-kit/fa/userO';
import { ic_lock_outline } from 'react-icons-kit/md/ic_lock_outline';

// 두개가 함께 있을땐 상단 (그 사이) 에 여백을 준다
const Wrapper = styled.div`
  & + & {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }

  display: flex;
  justify-content: space-around;
  width: 45%;
  margin-left: auto;
  margin-right: auto;
  padding: 10px;
  border-bottom: 1px solid white;
`;

const Label = styled.div`
  text-align: left;
  display: inline-block;
`;

const Input = styled.input`
  width: 85%;
  border: 0px;
  font-size: 1rem;
  background-color: transparent;
  color: white;

  ::placeholder {
    font-size: 1rem;
    color: white;
  }
`;

// rest 쪽에는 onChange, type, name, value, placeholder 등의 input 에서 사용 하는 값들을 넣어줄수 있다.
const LoginInputWithLabel = ({ label, ...rest }) => (
  <Wrapper>
    <Label>
      {label === 'id' ? (
        <Icon icon={userO} size={22} style={{ color: 'white' }} />
      ) : (
        <Icon icon={ic_lock_outline} size={22} style={{ color: 'white' }} />
      )}
    </Label>
    <Input {...rest} maxLength="20" />
  </Wrapper>
);

export default LoginInputWithLabel;
