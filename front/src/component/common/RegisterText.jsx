import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.text`
    margin-top: 3rem;
    font-size: 1.2rem;
    font-weight: 700;
    color: white;
    cursor: pointer;
`;

const RegisterText = ({ children, onClick }) => <Wrapper onClick={onClick}>{children}</Wrapper>;

export default RegisterText;
