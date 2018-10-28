import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    background-color: white;
    min-height: 100vh;
    border-bottom: 1px dashed #c2c2c2;
    width: 17rem;
    position: relative;
    color: black;
    text-align: center;
    z-index : 3;  
    float: left;  
    background-position: 0 0; 
    border-right: 1px solid black;
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
    height: 3rem;
    padding-top: 1.5rem;
    padding-left: 3.5rem;
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
    }
`;

const NavContainer = ({children}) => (
    <Wrapper>
       메
    </Wrapper>
);

export default NavContainer;