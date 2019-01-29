import React from 'react';
import styled from 'styled-components';
import { Button } from '.';

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
`;

const Wrapper = styled.div`
  width: 23%;
  text-align: center;
  background-color: white;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
  border-radius: 5px;
  box-shadow: 1px 1px 1px 1px #aaaaaa;
`;

const TitleWrapper = styled.div`
  width: 100%;
  text-align: center;
  min-height: 10vh;
`;

// children 이 들어가는 곳
const Contents = styled.div`
  padding-bottom: 1.5rem;
  height: auto;
`;

const LogoWrapper = styled.div`
  padding-top: 12%;
  color: #fe4c8d;
  font-weight: bold;
  font-size: 0.9rem;
  padding-left: 5%;
  padding-right: 5%;
`;

const AlertPopup = ({
  title, clickEvent, buttonName, displayAlertPop,
}) => (
  <MaskingWrapper style={displayAlertPop ? { display: 'block' } : { display: 'none' }}>
    <Wrapper>
      <TitleWrapper>
        <LogoWrapper>{title}</LogoWrapper>
      </TitleWrapper>
      <Contents>
        <Button onClick={clickEvent}>{buttonName}</Button>
      </Contents>
    </Wrapper>
  </MaskingWrapper>
);

export default AlertPopup;
