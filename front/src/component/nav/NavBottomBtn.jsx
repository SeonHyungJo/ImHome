import React from 'react';
import styled from 'styled-components';

const NavButtonContainer = styled.div`
  display: flex;
  align-items: flex-end;

  margin: 1rem;
  padding: 5px;

  border-radius: 5px;
  color: white;

  &.orange {
    background: orange;
  }

  &.pink {
    background: #fe4c8d;
  }

  width: 80%;
`;

const NavButton = styled.button`
  padding: 1rem;

  border: 1px solid white;
  border-radius: 5px;

  color: white;

  text-align: center;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;

  &.orange {
    background: orange;
  }

  &.pink {
    background: #fe4c8d;
  }

  width: 100%;
`;

const NavBottomBtn = ({ changeModeInfo, changeMode }) => (
  <NavButtonContainer
    className={changeModeInfo.buttonMode ? 'orange' : 'pink'}
    onClick={changeMode}
  >
    <NavButton className={changeModeInfo.buttonMode ? 'orange' : 'pink'}>
      {changeModeInfo.buttonMode ? '세금계산서발행' : '출고내역조회'}
    </NavButton>
  </NavButtonContainer>
);

export default NavBottomBtn;
