import React from 'react';
import classNames from 'classnames';
import * as CommonUtil from '../../util/commonUtil';

const SpecificationTableTotal = ({ totalCost }) => (
  <div className={classNames('footerTr', 'underLineDash')}>
    <div className="footerTd"> 합 계 </div>
    <div className="footerTd">
      {' '}
      {` ￦ ${CommonUtil.setCostFormat(totalCost)}`}
      {' '}
    </div>
    <p className="footer_subText">도착지 : 경기도 성남시 분당구 성남대로 208번길 1층</p>
    <p className="footer_subText">공급자 : 010-000-0000</p>
  </div>
);

export default SpecificationTableTotal;
