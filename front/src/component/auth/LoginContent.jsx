import React from 'react';
import styled from 'styled-components';

const TitleWrapper = styled.div`
    width: 100%;
    text-align: center;
    min-height: 10vh;
    color: black;
`;
const ContentTitle = styled.div`
    font-size: 1.6rem;
    font-weight: 700;
    color: white;
    margin-bottom: 5rem;
`;

const ContentDiv = styled.div`
    font-size: 0.9rem;
    color: #707070;
    margin-bottom: 1rem;
`;

const RegisterWrapper = ({ children }) => (
    <TitleWrapper>
        <ContentTitle>Welcome Back!</ContentTitle>
        <ContentDiv>{children}</ContentDiv>
    </TitleWrapper>
);

export default RegisterWrapper;
