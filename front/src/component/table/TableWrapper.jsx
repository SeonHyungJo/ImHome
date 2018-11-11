import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    background: white;
    padding: 0.5rem 1rem 0.5rem 1rem;
    width: 73rem;
    float: right;
    margin-right: 2.3rem;
`;

const Title = styled.h4`
    margin-bottom: 20px;     
`

const TableWrapper = ({ title, children }) => (
    <Wrapper>
        <Title>{title}</Title>
        {children}
    </Wrapper>
);

export default TableWrapper;