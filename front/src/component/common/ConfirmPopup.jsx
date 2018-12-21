import React from 'react';
import styled from 'styled-components';

const MaskingWrapper = styled.div`
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    z-index: 1300;
    position: fixed;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.5);
`

const Wrapper = styled.div`
    width: 23%;
    text-align: center;
    background-color: white;
    top: 50%;
    left: 53%;
    transform: translate(-50%, -50%);
    position: absolute;
    border-radius: 5px;
    box-shadow: 1px 1px 1px 1px #aaaaaa;
`;

const TitleWrapper = styled.div`
    width: 100%;
    text-align: center;
    min-height: 10vh;     
`

// children 이 들어가는 곳
const Contents = styled.div`
    padding-bottom: 1.5rem;
    height: auto;
`;

const LogoWrapper = styled.div`
    padding-top: 12%;
    color : #fe4c8d;
    font-weight: bold;
    font-size : 0.9rem;
`

const SubTitleWrapper = styled.div`
    padding-bottom: 5%;
    font-weight: bold;
    font-size : 0.5rem;
    color : gray;
`

const ConfirmPopup = ({ title, subTitle, children, style }) => (
    <MaskingWrapper style={style ? style : {}}>
        <Wrapper>
            <TitleWrapper>
                <LogoWrapper>
                    {title}
                </LogoWrapper>
            </TitleWrapper>
            <Contents>
                {children}
            </Contents>
            {
                subTitle ? (
                    <SubTitleWrapper>
                        {subTitle}
                    </SubTitleWrapper>
                ) : null
            }
        </Wrapper>
    </MaskingWrapper>
);

export default ConfirmPopup;