import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  padding-top: 0.3rem;
  padding-bottom: 0.3rem;

  border: 2px solid orange;
  border-radius: 3px;
  background: white;
  color: white;
  background-color: orange;

  text-align: center;
  font-size: 0.75rem;
  width: 5rem;
  cursor: pointer;
  font-weight: bold;
`;

// const Wrapper = styled.div`
//     text-align: right;
// `;

const FormBtn = ({ children, onClick }) => <Button onClick={onClick}>{children}</Button>;
export default FormBtn;
