import React from 'react';
import styled from 'styled-components';

const TitleWrapper = styled.div`
    width: 100%;
    text-align: center;
    border-bottom: 1px solid #c2c2c2
    min-height: 10vh;
    color: black;  
    margin-bottom: 1rem;   
`
const ContentDiv = styled.div`
    font-size: 0.9rem;
    color: #707070;
`

const RegisterWrapper = ({children}) => (
            <TitleWrapper>
                <ContentDiv>
                    {children}
                </ContentDiv>
            </TitleWrapper>
);

export default RegisterWrapper;