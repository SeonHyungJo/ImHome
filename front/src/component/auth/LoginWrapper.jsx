import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    width: 55%;
    text-align: center;
    background-color: #fe4c8d;
`;

const TitleWrapper = styled.div`
    background-color: #fe4c8d;
    width: 100%;
    text-align: center;
    min-height: 30vh;
`;

// children 이 들어가는 곳
const Contents = styled.div`
    background: #fe4c8d;
    height: auto;
`;

const Image = styled.img`
    width: 35%;
    height: 35%;
`;

const LoginWrapper = ({ children }) => (
    <Wrapper>
        <TitleWrapper>
            <Image src="/images/log_logo.png" />
            <Contents>{children}</Contents>
        </TitleWrapper>
    </Wrapper>
);

export default LoginWrapper;
