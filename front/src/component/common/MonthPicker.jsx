import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    display: inline-block;
    color: #000;
    padding: 1.5px;
    border: 1.5px solid rgba(100, 100, 100, 0.3);
    border-radius: 2px;

    div {
        display: inline-block;
    }

    .sideArrow {
        padding: 0px 7px;
        font-size: 1rem;
        cursor: pointer;
    }

    .middleLine {
        font-size: 1rem;
    }

    .monthText {
        padding: 0px 5px;
        text-align: center;
        font-size: 0.8rem;
        width: 4rem;
    }
`;

const MonthPicker = ({ type, children, onClick, style, name, value, checked }) => (
    <Wrapper style={style ? style : {}} onClick={onClick}>
        <div className="sideArrow">&lt;</div>
        <div className="middleLine">|</div>
        {type === 'year' ? (
            <div className="monthText">2018년</div>
        ) : (
            <div className="monthText">1월</div>
        )}
        <div className="middleLine">|</div>
        <div className="sideArrow">&gt;</div>
    </Wrapper>
);

export default MonthPicker;
