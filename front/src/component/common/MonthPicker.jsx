import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    display: inline-block;
    color: #000;
    padding: 0.3rem;
    height: 17px;

    vertical-align: -20%;

    border: 1.5px solid rgba(100, 100, 100, 0.3);
    border-radius: 2px;

    div {
        display: inline-block;
        height: 100%;
    }

    .leftArrow {
        border: 1px solid #fe4c8d;
        width: 2rem;
    }

    .rightArrow {
        border: 1px solid #fe4c8d;
        width: 2rem;
    }

    .middleLine {
        border: 1px solid #fe4c8d;
        width: 1px;
    }

    .monthText {
        border: 1px solid #fe4c8d;
        text-align: center;
        width: 5rem;
    }
`;

const MonthPicker = ({ children, onClick, style, name, value, checked }) => (
    <Wrapper style={style ? style : {}} onClick={onClick}>
        <div className="leftArrow">&lt;</div>
        <div className="middleLine" />
        <input type="number" className="monthText" max="12" contentEditable="true" />
        <div className="middleLine" />
        <div className="rightArrow">&gt;</div>
    </Wrapper>
);

export default MonthPicker;
