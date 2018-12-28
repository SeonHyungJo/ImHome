import React from 'react';
import ReactExport from 'react-data-export';

import * as CommonUtil from '../../util/commonUtil';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

class ReactToExcel extends React.Component {
    render() {
        const { trigger, exportData } = this.props;
        return (
            <ExcelFile element={trigger}>
                <ExcelSheet data={exportData} name="거래내역">
                    <ExcelColumn
                        label="거래일자"
                        value={col => CommonUtil.setTotalDate(col.updatedAt)}
                    />
                    <ExcelColumn
                        label="거래시간"
                        value={col => CommonUtil.setTotalTime(col.updatedAt)}
                    />
                    <ExcelColumn label="거래처" value="branchName" />
                    <ExcelColumn
                        label="총 금액"
                        value={col => {
                            return CommonUtil.setCostFormat(
                                col.items.reduce(
                                    (total, item) =>
                                        parseInt(item.itemCount, 10) * parseInt(item.itemCost, 10) +
                                        total,
                                    0
                                )
                            );
                        }}
                    />
                </ExcelSheet>
            </ExcelFile>
        );
    }
}

export default ReactToExcel;
