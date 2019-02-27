import React from 'react';

import { TableWrapper, TableWithTitle } from '../table';
import { TableWithContent } from '.';
import * as CommonUtil from '../../util/commonUtil';

/* Updated 2019-02-27 */
/* 컴포넌트 정리진행 */
const TableWithScroll = ({
  gridTitle,
  headerData = [],
  contentsList = [],
  id,
  clickRow,
  footer,
}) => (
  <TableWrapper title={gridTitle}>
    <TableWithTitle>
      <TableHeader headerData={headerData} />
    </TableWithTitle>
    <TableWithContent>
      {contentsList.length > 0 ? (
        contentsList.map((content, index) => (
          <TableMain
            key={index}
            content={content}
            headerData={headerData}
            index={index}
            clickRow={clickRow}
            standardId={id}
          />
        ))
      ) : (
        <TableDataZero headerData={headerData} />
      )}
    </TableWithContent>
    <TableWithContent>
      <TableFooter footer={footer} />
    </TableWithContent>
  </TableWrapper>
);

/**
 * @description TableHeader
 * @param {*} headerData
 */
const TableHeader = ({ headerData }) => (
  <tr>{headerData && headerData.map((column, index) => <th key={index}>{column.label}</th>)}</tr>
);

const TableDataZero = ({ headerData }) => (
  <tr>
    <td style={{ textAlign: 'center' }} colSpan={Object.keys(headerData).length}>
      {'데이터가 없습니다.'}
    </td>
  </tr>
);

const TableMain = ({
  content, headerData, index, clickRow, standardId,
}) => (
  <tr
    className={standardId && content._id === standardId ? 'on' : ''}
    key={index}
    onClick={() => clickRow(content._id)}
  >
    {headerData
      && headerData.map((data, index) => {
        const textAlign = data.numeric ? 'right' : 'center';

        return data.formatter ? (
          <td key={index} style={{ textAlign }}>
            {data.formatter(content[data.id])}
          </td>
        ) : (
          <td key={index} style={{ textAlign }}>
            {data.id === 'totalDealCost'
              ? CommonUtil.setCostFormat(CommonUtil.getTotalCost(content.items))
              : content[data.id] || '-'}
          </td>
        );
      })}
  </tr>
);

const TableFooter = ({ footer }) => (
  <tr>
    {footer.map((context, index) => (
      <th
        key={index}
        style={
          footer.length === index + 1 ? { border: '0px', textAlign: 'right' } : { border: '0px' }
        }
      >
        {CommonUtil.setCostFormat(context)}
      </th>
    ))}
  </tr>
);

export default React.memo(TableWithScroll);
