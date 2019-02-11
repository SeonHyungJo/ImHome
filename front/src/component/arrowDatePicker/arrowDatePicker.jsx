import React from 'react';

import './arrowDatePicker.css';

const MONTH_LIST = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

class ArrowDatePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentData: props.type === 'year' ? props.year : props.month,
      type: props.type,
    };
  }

  setDate = (changeNum, onClickFunc) => {
    const { type } = this.state;
    const changeDate = type === 'year' ? this.setYear(changeNum) : this.setMonth(changeNum);

    onClickFunc && onClickFunc({ type, changeDate });
  };

  setYear = (changeNum) => {
    const { currentData } = this.state;
    const changeYear = currentData + changeNum <= 0 ? currentData : currentData + changeNum;

    this.setState(prevState => ({
      ...prevState,
      currentData: changeYear,
    }));

    return changeYear;
  };

  setMonth = (changeNum) => {
    const { currentData } = this.state;
    const changeMonth = MONTH_LIST[(currentData + changeNum - 1) % 12];

    this.setState(prevState => ({
      ...prevState,
      currentData: changeMonth,
    }));

    return changeMonth;
  };

  render() {
    const {
      type, onClick, year, month,
    } = this.props;
    const { currentData } = this.state;

    return (
      <div className="__arrow-date-picker-container">
        <div className="sideArrow" onClick={() => this.setDate(-1, onClick)}>
          &lt;
        </div>
        <div className="middleLine">|</div>
        {type === 'year' ? (
          <div className="monthText">{`${year}년`}</div>
        ) : (
          <div className="monthText">{`${month}월`}</div>
        )}
        <div className="middleLine">|</div>
        <div className="sideArrow" onClick={() => this.setDate(1, onClick)}>
          &gt;
        </div>
      </div>
    );
  }
}

export default ArrowDatePicker;
