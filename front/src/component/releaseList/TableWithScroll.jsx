import React from 'react';
import { TableWrapper, TableWithTitle } from '../table';
import { TableWithContent } from './';

class TableWithScroll extends React.Component {
    render() {
        return (
            <TableWrapper title={this.props.gridTitle}>
                <TableWithTitle>
                    <tr>
                        {this.props.headerData &&
                            this.props.headerData.map((column, index) => {
                                return <th key={index}>{column.label}</th>;
                            }, this)}
                    </tr>
                </TableWithTitle>
                <TableWithContent>
                    {this.props.data.length > 0 ? (
                        this.props.data.map((n, index) => {
                            return this.props.id && n._id === this.props.id ? (
                                <tr
                                    className="on"
                                    key={index}
                                    onClick={() => this.props.clickRow(n._id)}
                                >
                                    {this.props.headerData &&
                                        this.props.headerData.map((data, index) => {
                                            let textAlign = data.numeric ? 'right' : 'center';
                                            if (
                                                typeof data.formatter === 'function' &&
                                                data.formatter
                                            ) {
                                                return (
                                                    <td
                                                        key={index}
                                                        style={{ textAlign: textAlign }}
                                                    >
                                                        {data.formatter(n[data.id])}
                                                    </td>
                                                );
                                            } else {
                                                return (
                                                    <td
                                                        key={index}
                                                        style={{ textAlign: textAlign }}
                                                    >
                                                        {n[data.id]}
                                                    </td>
                                                );
                                            }
                                        })}
                                </tr>
                            ) : (
                                <tr key={index} onClick={() => this.props.clickRow(n._id)}>
                                    {this.props.headerData &&
                                        this.props.headerData.map((data, index) => {
                                            let textAlign = data.numeric ? 'right' : 'center';
                                            if (
                                                typeof data.formatter === 'function' &&
                                                data.formatter
                                            ) {
                                                return (
                                                    <td
                                                        key={index}
                                                        style={{ textAlign: textAlign }}
                                                    >
                                                        {' '}
                                                        {data.formatter(n[data.id])}
                                                    </td>
                                                );
                                            } else {
                                                return (
                                                    <td
                                                        key={index}
                                                        style={{ textAlign: textAlign }}
                                                    >
                                                        {n[data.id]}
                                                    </td>
                                                );
                                            }
                                        })}
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <td
                                style={{ textAlign: 'center' }}
                                colSpan={Object.keys(this.props.headerData).length}
                            >
                                데이터가 없습니다.
                            </td>
                        </tr>
                    )}
                </TableWithContent>
                <TableWithContent>
                    <tr>
                        {this.props.bottom.map((context, index) => {
                            return this.props.bottom.length === index + 1 ? (
                                <th style={{ border: '0px', textAlign: 'right' }}>{context}</th>
                            ) : (
                                <th style={{ border: '0px' }}>{context}</th>
                            );
                        })}
                    </tr>
                </TableWithContent>
            </TableWrapper>
        );
    }
}

export default TableWithScroll;
