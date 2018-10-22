import React from 'react';
import styled from 'styled-components';

// 너비, 그림자 설정
const Wrapper = styled.div`
    width: 42%;
    text-align: center;
    background-color: white;
    min-height: 100vh;    
`;

const TitleWrapper = styled.div`
    width: 100%;
    text-align: center;
    background-image: url('/images/up_bg.png');
    background-size : cover;
    border-bottom: 1px solid #c2c2c2
    min-height: 15vh;     
`

// children 이 들어가는 곳
const Contents = styled.div`
    background: white;
    padding: 2rem;
    height: auto;
`;

const LogoWrapper = styled.div`
    padding-top: 9%;
`

const Image = styled.img`
    width: 25%;
    height: 20%;
`

const RegisterWrapper = ({title, children}) => (
        <Wrapper>
            <TitleWrapper>
                <LogoWrapper>
                    <Image src='/images/logo.png' />
                </LogoWrapper>
            </TitleWrapper>
            <Contents>
                {children}
            </Contents>
        </Wrapper>
);

export default RegisterWrapper;