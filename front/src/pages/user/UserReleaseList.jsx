import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { PageTemplate } from '../../component/template';
import { ViewForRelease, TableWithScroll } from '../../component/releaseList';
import { FormBtn } from '../../component/common';
import * as ReleaseActions from '../../redux/modules/releaseList';
import * as CommonUtil from '../../util/commonUtil';

class AdminReleaseList extends Component {
  constructor(props) {
    super(props);

    const headerData = [
      {
        id: 'updatedAt',
        numeric: false,
        label: '거래일자',
        formatter(data) {
          return CommonUtil.setTotalDate(data);
        },
      },
      {
        id: 'updatedAt',
        numeric: false,
        label: '거래시간',
        formatter(data) {
          return CommonUtil.setTotalTime(data);
        },
      },
      { id: 'branchName', numeric: false, label: '거래처' },
      { id: 'bNumber', numeric: false, label: '주문건수' },
      { id: 'totalDealCost', numeric: true, label: '거래금액(원)' },
    ];

    // 검색내용을 저장하는 용도로 사용할 것인지 아니면 redux로 관리를 할 것인지....
    const searchingData = {
      term: 'all', // all, part, tax, trade 조회내용 선택기준
      startDate: CommonUtil.setTotalDate(new Date()), // 기간설정(시작)
      endDate: CommonUtil.setTotalDate(new Date()), // 기간설정(끝)
    };

    const radioBtnSetting = {
      name: 'searchType', // 동일한 타입이 들어가고
      value: ['all'], // 사용자는 일단 1개로 진행 추가될 수 있음
      text: ['전체내역'], // 사용자는 일단 1개로 진행 추가될 수 있음
    };

    const leftNavList = [
      {
        branchCode: '001',
        branchName: '아임홈',
      },
    ];

    this.state = {
      custNo: 1,
      headerData,
      searchingData,
      radioBtnSetting,
      store: leftNavList,
      currentId: '001',
    };
  }

  async componentDidMount() {
    await this.getNavData();
  }

  // 리스트 클릭시 주문내역 리스트 가져오기
  changeSearchTerm = (e) => {
    try {
      // e.preventDefault();
      e.stopPropagation();
      const newTerm = e.target.value;
      this.setState(prevState => ({
        ...prevState,
        searchingData: { ...prevState.searchingData, term: newTerm },
      }));
    } catch (e) {
      console.log(e);
    }
  };

  getNavData = async () => {
    try {
      const { ReleaseActions } = this.props;
      await ReleaseActions.getOrderList();
    } catch (e) {
      console.log(e);
    }
  };

  getTotalCost = (list) => {
    if (!list.length) {
      return 0;
    }

    return list.reduce(
      (total, order) => total
        + order.items.reduce(
          (total, item) => parseInt(item.itemCount, 10) * parseInt(item.itemCost, 10) + total,
          0,
        ),
      0,
    );
  };

  getRowData = async (changeNo) => {
    const { ReleaseActions } = this.props;

    await ReleaseActions.updateCustNo(changeNo);
    // await ReleaseActions.getOrderData(changeNo);
  };

  handleChangeStartDate = (newDate) => {
    const { ReleaseActions } = this.props;

    ReleaseActions.updateStartDate(newDate);
  };

  handleChangeEndDate = (newDate) => {
    const { ReleaseActions } = this.props;

    ReleaseActions.updateEndDate(newDate);
  };

  render() {
    const {
      store, currentId, searchingData, radioBtnSetting,
    } = this.state;
    const {
      list, custNo, startDate, endDate,
    } = this.props;
    const role = 'user';

    return (
      <PageTemplate role={role} navData={store} id={currentId}>
        <ViewForRelease
          type="date"
          viewTitle="주문내역조회"
          searchingData={searchingData}
          radioBtnSetting={radioBtnSetting}
          radioClick={this.changeSearchTerm}
          startDate={startDate}
          endDate={endDate}
          handleChangeStartDate={this.handleChangeStartDate}
          handleChangeEndDate={this.handleChangeEndDate}
        >
          <FormBtn style={{ width: '80px', margin: '0' }}>조회</FormBtn>
        </ViewForRelease>

        <ViewForRelease
          type="normal"
          viewTitle="거래내용"
          viewSubTitle={` | 최근거래내역[총 ${list.length === undefined ? 0 : list.length}건]`}
          totalCost={this.getTotalCost(list)}
          totalList={list.length === undefined ? 0 : list.length}
        />

        <TableWithScroll
          headerData={this.state.headerData}
          data={list}
          gridTitle="조회내용"
          clickRow={this.getRowData}
          id={custNo}
          bottom={['Total', '', '', '총 주문건수', this.getTotalCost(list)]}
          w
          ref={el => (this.componentRef = el)}
        />
      </PageTemplate>
    );
  }
}

export default connect(
  state => ({
    form: state.releaseList.getIn(['releaseList', 'form']),
    list: state.releaseList.getIn(['releaseList', 'list']),
    store: state.releaseList.getIn(['releaseList', 'store']),
    startDate: state.releaseList.getIn(['releaseList', 'startDate']),
    endDate: state.releaseList.getIn(['releaseList', 'endDate']),
    custNo: state.releaseList.getIn(['releaseList', 'custNo']),
    error: state.releaseList.getIn(['releaseList', 'error']),
    result: state.releaseList.get('result'),
  }),
  dispatch => ({
    ReleaseActions: bindActionCreators(ReleaseActions, dispatch),
  }),
)(AdminReleaseList);
