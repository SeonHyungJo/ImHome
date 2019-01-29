import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: inline-block;
  color: #000;
  margin: 0rem 0.7rem;

  text-align: center;
  font-size: 0.8rem;
  font-weight: bold;
  cursor: pointer;

  input[type='radio'] {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }
  input[type='radio'] + label {
    display: inline-block;
    position: relative;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
  }
  input[type='radio'] + label:before {
    content: '';
    position: absolute;
    left: 0;
    top: 1px;
    width: 15px;
    height: 15px;
    text-align: center;
    background: #fff;
    border: 2px solid rgba(0, 0, 0, 0.6);
    border-radius: 25px;
  }

  input[type='radio']:checked + label:before {
    border: 2px solid #fe4c8d;
  }

  input[type='radio']:checked + label {
    color: #fe4c8d;
  }

  input[type='radio']:checked + label:after {
    content: '';
    position: absolute;
    color: #fe4c8d;
    top: 7px;
    left: 6px;
    width: 7px;
    height: 7px;
    background: #fe4c8d;
    border-radius: 100%;
  }

  /* radio size */
  input[type='radio'] + label {
    padding-left: 25px;
  }
`;

const DefaultRadio = ({
  children, onClick, style, name, value, checked,
}) => (
  <Wrapper style={style || {}}>
    <input
      id={`${name}_${children}`}
      type="radio"
      name={name}
      value={value}
      onClick={onClick}
      defaultChecked={checked}
    />
    <label htmlFor={`${name}_${children}`}>
      <span>{children}</span>
    </label>
  </Wrapper>
);

export default DefaultRadio;
