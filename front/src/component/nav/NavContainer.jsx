import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  background-color: white;
  color: black;
  float: left;

  width: 15rem;
  max-height: 66.8vh;

  overflow-y: scroll;
  z-index: 10;

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
    border-radius: 5px;
  }
`;

const NavWrapper = styled.ul`
  background: white;
  text-align: left;
  list-style: none;
  padding: 0.3rem 1.5rem;

  li {
    box-sizing: border-box;
    border-bottom: 1px solid #d7d7d7;

    padding: 0.9rem 0.5rem 0.8rem 3rem;

    color: #555555;
    cursor: pointer;
    font-size: 1.2rem;
    font-weight: bold;
    text-decoration: none;

    background-image: url('/images/icon_b.png');
    background-repeat: no-repeat;
    background-position: 8% 55%;
    background-size: 1.4rem;
  }

  li:hover {
    /* background-color: #fe4c8d; */
    /* color: #ffffff; */
    /* background-image: url('/images/icon_w.png'); */
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
