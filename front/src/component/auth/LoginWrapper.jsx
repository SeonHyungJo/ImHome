import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    width: 100%;
    text-align: center;
    background-color: #fe4c8d;
`;

const TitleWrapper = styled.div`
    background-color: #fe4c8d;
    width: 100%;
    text-align: center;
    min-height: 30vh;     
`

// children 이 들어가는 곳
const Contents = styled.div`
    background: #fe4c8d;
    padding: 1.5rem;
    height: auto;
`;

const LogoWrapper = styled.div`
    padding-top: 9%;
`

const Image = styled.img`
    width: 10%;
    height: 10%;
`

const LoginWrapper = ({ children }) => (
    <Wrapper>
        <TitleWrapper>
            <LogoWrapper>
                <Image src='/images/log_logo.png' />
            </LogoWrapper>
            <Contents>
                {children}
            </Contents>
        </TitleWrapper>
    </Wrapper>
);

export default LoginWrapper;