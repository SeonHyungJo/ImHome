import React from 'react';
import { TableWrapper, TableWithContent, TableWithTitle } from './';

class TableWithScroll extends React.Component {

    scrollTable1 = (e) => {
        this.table2.scrollLeft = this.table1.scrollLeft;

    }

    scrollTable2 = (e) => {
        this.table1.scrollLeft = this.table2.scrollLeft;

        if (this.props.progressShow === false) {
            if ((this.table2.scrollHeight - this.table2.scrollTop === this.table2.clientHeight) && (this.props.totalCount !== this.props.rowData.length)) {

                this.props.goSearch();
            } else {
                return;
            }
        } else {
            return;
        }

        // document.getElementById("table1").scrollRight = document.getElementById("table2").scrollRight;
    }

    render() {
        return (
            <TableWrapper title={this.props.gridTitle}>
                <TableWithTitle>
                    <tr>
                        {this.props.headerData && this.props.headerData.map((column, index) => {
                            return (
                                <th key={index}>{column.label}</th>
                            );
                        }, this)}
                    </tr>
                </TableWithTitle>
                <TableWithContent>
                    {this.props.data.length > 0 ?
                        this.props.data.map((n, index) => {
                            return this.props.id && n._id === this.props.id ? (
                                <tr className="on" key={index} onClick={() => this.props.clickRow(n._id)}>
                                    {
                                        this.props.headerData && this.props.headerData.map((data, index) => {
                                            let textAlign = data.numeric ? "right" : "center";
                                            if (typeof (data.formatter) === 'function' && data.formatter) {
                                                return (
                                                    <td key={index} style={{ textAlign: textAlign }}>
                                                        {data.formatter(n[data.id])}
                                                    </td>
                                                )

                                            } else {
                                                return (
                                                    <td
                                                        key={index}
                                                        style={{ textAlign: textAlign }}>
                                                        {n[data.id]}
                                                    </td>
                                                );
                                            }
                                        })
                                    }
                                </tr>
                            ) : (
                                    <tr key={index} onClick={() => this.props.clickRow(n._id)}>
                                        {
                                            this.props.headerData && this.props.headerData.map((data, index) => {
                                                let textAlign = data.numeric ? "right" : "center";
                                                if (typeof (data.formatter) === 'function' && data.formatter) {
                                                    return (<td key={index} style={{ textAlign: textAlign }}
                                                    > {data.formatter(n[data.id])}
                                                    </td>)

                                                } else {
                                                    return (
                                                        <td
                                                            key={index}
                                                            style={{ textAlign: textAlign }}>
                                                            {n[data.id]}
                                                        </td>
                                                    );
                                                }
                                            })
                                        }
                                    </tr>
                                );
                        })
                        :
                        <tr>
                            <td style={{ textAlign: 'center' }} colspan={Object.keys(this.props.headerData).length}>
                                데이터가 없습니다.
                            </td>
                        </tr>
                    }
                </TableWithContent>
            </TableWrapper>

        );
    }
}

export default TableWithScroll;
