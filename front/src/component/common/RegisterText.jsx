import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    margin-top: 3rem;
    font-size: 1.2rem;
    font-weight: 700;
    color: white;
    cursor: pointer;
`;

const RegisterText = ({ children, onClick }) => (<Wrapper onClick={onClick ? onClick : null}>{children}</Wrapper>);

export default RegisterText;
