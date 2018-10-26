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
    width: 10%;
    min-height: 6vh;
    display: inline-block;
    background-image: url('/images/logo.png');
    background-repeat: no-repeat;
    position: relative;
    float: left;
    cursor: pointer; 
`
const Image = styled.img`
    position: relative;
    bottom: 0;
`

const MenuWrapper = styled.div`
    float: right;
`;

const HeaderContainer = ({children}) => (
    <div>
        <h2>Header</h2>
    </div>
);

export default HeaderContainer;