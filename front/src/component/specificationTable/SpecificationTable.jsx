import React from 'react';
import styled from 'styled-components';
import classNames from 'classnames';

const ContentWrapper = styled.div`
    display: inline-block;
    height: 75vh;
    padding: 10px;
`;

const SpecificationTable = ({ branchName, orderList, buttonList }) => (
    <ContentWrapper>
        <div>명세서 23일까지</div>
    </ContentWrapper>
);

export default SpecificationTable;
