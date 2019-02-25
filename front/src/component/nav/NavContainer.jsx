import React from 'react';
import styled from 'styled-components';
import { NavBottomBtn } from '.';

const Wrapper = styled.div`
  background-color: white;
  color: black;
  float: left;

  width: 15rem;
  min-height: 89.8vh;
`;

const NavWrapper = styled.ul`
  background: white;
  text-align: left;
  list-style: none;
  padding: 0.3rem 0.5rem 0.3rem 1rem;

  overflow-y: scroll;
  height: 69vh;

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

const NavContainer = ({ changeModeInfo, changeMode, children }) => (
  <Wrapper>
    <NavWrapper>{children}</NavWrapper>
    {changeModeInfo
      && changeModeInfo.releaseMode && (
        <NavBottomBtn changeModeInfo={changeModeInfo} changeMode={changeMode} />
    )}
  </Wrapper>
);

export default NavContainer;
