import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    background-color: white;
    min-height: 10vh;
    border-bottom: 1px dashed #c2c2c2;
    width: inherit;
    position: relative;
    color: black;
    text-align: center;
    z-index : 3;
        
`;

const LogoWrapper = styled.div`
    width: 5%;
    min-height: 6vh;
    position: relative;
    float: left;
    cursor: pointer;
    text-align: center;
`
const Image = styled.img`
    position: relative;
    bottom: 0;
    height: 2.6rem;
    padding-top: 1.5rem;
    padding-left: 3.5rem;
`

const CaptionWrapper = styled.div`
    border: 1px solid #fe4c8d;
    text-align: left;
    float: left;
    background-color: #fe4c8d;
    color: white;
    font-weight: bold;
    border-radius: 0.2rem;
    padding: 0 0.6rem;
    margin-left: 6.8rem;
    margin-top: 1.3rem;
    font-size: 0.75rem;
`

const MenuWrapper = styled.ul`
    width:50rem;
    background:white;
    float:right;
    list-style:none;
    padding-top:1rem;
    padding-right:2rem;
    li{
        float: right;
        margin-right:2.5rem;
        cursor : pointer;
    };
    li a {
        font-size:1rem;
        color:#000000;
        font-weight:bold;
        text-decoration:none
    };
    li a:hover {
        color:#fe4c8d;
    };
    li .on {
        color:#fe4c8d;
    };
    li button {
        background-color: transparent;
        font-size:1rem;
        color:#000000;
        font-weight:bold;
        text-decoration:none;
        border : 0px;
        cursor : pointer;
    };
    li button:hover {
        color:#fe4c8d;
    }

`;

const HeaderContainer = ({ caption, children }) => (
    <Wrapper>
        <LogoWrapper>
            <Image src='/images/m_logo.png' />
        </LogoWrapper>
        <CaptionWrapper>
            {caption}
        </CaptionWrapper>
        <MenuWrapper>
            {children}
        </MenuWrapper>
    </Wrapper>
);

export default HeaderContainer;