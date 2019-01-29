import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  background-color: white;
  background-position: 0 0;
  color: black;
  text-align: center;
  float: left;
  overflow-y: scroll;
  width: 17rem;
  max-height: 89.8vh;
  z-index: 3;

  /* Scroll Custom */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-button {
    width: 0px;
    height: 0px;
  }

  ::-webkit-scrollbar-thumb {
    background: #fe4c8d;
    border-radius: 8px;
  }
`;

const NavWrapper = styled.ul`
  background: white;
  text-align: left;
  list-style: none;
  padding-top: 0.5rem;
  width: 13rem;

  li {
    box-sizing: border-box;
    padding: 1.4rem 0.5rem 0.5rem 2.5rem;
    font-size: 1.1rem;
    color: #555555;
    cursor: pointer;
    font-weight: bold;
    text-decoration: none;
    background-image: url('/images/icon_b.png');
    background-repeat: no-repeat;
    background-position: 8% 70%;
    background-size: 1.1rem;
    border-bottom: 1px solid #d7d7d7;
  }
  li:hover {
    background-color: #fe4c8d;
    color: #ffffff;
    background-image: url('/images/icon_w.png');
  }
  .on {
    background-color: #fe4c8d;
    color: #ffffff;
    background-image: url('/images/icon_w.png');
    background-repeat: no-repeat;
  }
`;

const NavContainer = ({ children }) => (
  <Wrapper>
    <NavWrapper>{children}</NavWrapper>
  </Wrapper>
);

export default NavContainer;
