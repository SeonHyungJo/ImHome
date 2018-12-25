import React from 'react';
import { TableWrapper, TableWithContent, TableWithTitle } from './';

class TableWithScroll extends React.Component {

    shouldComponentUpdate(nextProps, nextState) {
        let returnVal = true;
        if (nextProps.data === this.props.data && nextProps.id === this.props.id)
            returnVal = false;

        return returnVal;
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
                    {this.props.data && this.props.data.length > 0 ?
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
                            <td style={{ textAlign: 'center' }} colSpan={Object.keys(this.props.headerData).length}>
                                데이터가 없습니다.
                            </td>
                        </tr>
                    }

                </TableWithContent>
                {this.props.button ?
                    (
                        <TableWithContent>
                            {console.log(this.props.button)}
                            <tr>
                                <th colSpan={Object.keys(this.props.headerData).length} style={{ textAlign: 'right', padding: '0.5rem', lineHeight: '1.5rem', height: '2rem' }}>
                                    {this.props.button}
                                </th>
                            </tr>
                        </TableWithContent>
                    ) : <div />
                }
            </TableWrapper>

        );
    }
}

export default TableWithScroll;
