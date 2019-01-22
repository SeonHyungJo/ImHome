import React from 'react';
import styled from 'styled-components';

// 두개가 함께 있을땐 상단 (그 사이) 에 여백을 준다
const Wrapper = styled.div`
    margin-bottom: 0.8rem;
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

const SelectBox = styled.select`
    width: 52.1%;
    border: 1px solid #c2c2c2;
    outline: none;
    border-radius: 3px;
    height: 2.4em;
    font-size: 0.7rem;
    padding-left: 0.5rem;
    padding-right: 0.01rem;
    ::placeholder {
        font-size: 0.7rem;
        color: #7d7d7d;
    }
`;

// rest 쪽에는 onChange, type, name, value, placeholder 등의 input 에서 사용 하는 값들을 넣어줄수 있다.
const SelectboxWithLabel = ({ label, children, ...rest }) => (
    <Wrapper>
        <Label>{label}</Label>
        <SelectBox {...rest}>
            {children}
        </SelectBox>
    </Wrapper>
);

export default SelectboxWithLabel;