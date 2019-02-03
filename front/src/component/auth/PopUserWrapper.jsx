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
`;

const Wrapper = styled.div`
  width: 40%;
  text-align: center;
  background-color: white;
  border: 1px solid black;
  border-top: 6px solid #fe4c8d;
  top: 51%;
  left: 51%;
  transform: translate(-50%, -50%);
  position: absolute;
`;

const TitleWrapper = styled.div`
  width: 100%;
  text-align: center;
  background-image: url('/images/up_bg.png');
  background-size: cover;
  border-bottom: 1px solid #fe4c8d;
  min-height: 15vh;
`;

// children 이 들어가는 곳
const Contents = styled.div`
  background: white;
  padding: 1.5rem;
  height: auto;
`;

const LogoWrapper = styled.div`
  padding-top: 9%;
`;

const Image = styled.img`
  width: 25%;
  height: 20%;
`;

const PopUserWrapper = ({ children, style }) => (
  <MaskingWrapper style={style || {}}>
    <Wrapper>
      <TitleWrapper>
        <LogoWrapper>
          <Image src="/images/logo.png" />
        </LogoWrapper>
      </TitleWrapper>
      <Contents>{children}</Contents>
    </Wrapper>
  </MaskingWrapper>
);

export default PopUserWrapper;
