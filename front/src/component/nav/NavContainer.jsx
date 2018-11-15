import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    background-color: white;
    min-height: 89.8vh;
    border-bottom: 1px dashed #c2c2c2;
    width: 17rem;
    position: relative;
    color: black;
    text-align: center;
    z-index : 3;  
    float: left;  
    background-position: 0 0; 
`

const NavWrapper = styled.ul`
    width:13rem;
    background:white;
    text-align:left;
    list-style:none;
    padding-top:0.5rem;
    li{
        box-sizing: border-box;
        padding: 1.4rem 0.5rem 0.5rem 2.5rem;
        font-size:1.1rem;
        color:#555555;
        font-weight:bold;
        text-decoration:none;
        background-image: url('/images/icon_b.png');
        background-repeat: no-repeat;
        background-position: 8% 70%;
        background-size: 1.1rem;
        border-bottom: 1px solid #d7d7d7
    };
    li:hover {
        background-color:#fe4c8d;
        color: #ffffff;
        background-image:url('/images/icon_w.png')
    };
    .on {
        background-color:#fe4c8d;
        color: #ffffff;
        background-image:url('/images/icon_w.png');
        background-repeat: no-repeat;
    }
`

const NavContainer = ({ children }) => (
    <Wrapper>
        <NavWrapper>
            {children}
        </NavWrapper>
    </Wrapper>
);

export default NavContainer;