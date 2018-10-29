import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.button`
    margin-top: 1rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;

    border : 2px solid #fe4c8d
    border-radius: 3px;
    background: white;
    color : #fe4c8d

    text-align: center;
    font-size: 0.8rem;
    width: 8rem;
    cursor: pointer;
    font-weight: bold
`;

const Button = ({children, onClick}) => (
    <Wrapper onClick={onClick}>
        {children}
    </Wrapper>
);

export default Button;