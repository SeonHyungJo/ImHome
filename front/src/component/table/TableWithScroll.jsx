import React from 'react'
import { TableWrapper, TableWithContent, TableWithTitle } from './'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as UserActions from '../../redux/modules/user'

class TableWithScroll extends React.Component {
  render () {
    const { list: data, custNo } = this.props
    console.log('회원정보리스트 Render')
    return (
      <TableWrapper title={this.props.gridTitle}>
        <TableWithTitle>
          <tr>
            {this.props.headerData &&
              this.props.headerData.map((column, index) => {
                return <th key={index}>{column.label}</th>
              }, this)}
          </tr>
        </TableWithTitle>
        <TableWithContent>
          {data.length > 0 ? (
            data.map((n, index) => {
              return custNo && n._id === custNo ? (
                <tr className='on' key={index} onClick={() => this.props.clickRow(n._id)}>
                  {this.props.headerData &&
                    this.props.headerData.map((data, index) => {
                      let textAlign = data.numeric ? 'right' : 'center'
                      if (typeof data.formatter === 'function' && data.formatter) {
                        return (
                          <td key={index} style={{ textAlign: textAlign }}>
                            {data.formatter(n[data.id])}
                          </td>
                        )
                      } else {
                        return (
                          <td key={index} style={{ textAlign: textAlign }}>
                            {n[data.id]}
                          </td>
                        )
                      }
                    })}
                </tr>
              ) : (
                <tr key={index} onClick={() => this.props.clickRow(n._id)}>
                  {this.props.headerData &&
                    this.props.headerData.map((data, index) => {
                      let textAlign = data.numeric ? 'right' : 'center'
                      if (typeof data.formatter === 'function' && data.formatter) {
                        return (
                          <td key={index} style={{ textAlign: textAlign }}>
                            {' '}
                            {data.formatter(n[data.id])}
                          </td>
                        )
                      } else {
                        return (
                          <td key={index} style={{ textAlign: textAlign }}>
                            {n[data.id]}
                          </td>
                        )
                      }
                    })}
                </tr>
              )
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
        {this.props.button ? (
          <TableWithContent>
            <tr>
              <th
                colSpan={Object.keys(this.props.headerData).length}
                style={{
                  textAlign: 'right',
                  padding: '0.5rem',
                  lineHeight: '1.5rem',
                  height: '2rem'
                }}
              >
                {this.props.button}
              </th>
            </tr>
          </TableWithContent>
        ) : (
          <div />
        )}
      </TableWrapper>
    )
  }
}

export default connect(
  state => ({
    list: state.user.getIn(['user', 'list']),
    custNo: state.user.getIn(['user', 'custNo'])
  }),
  dispatch => ({
    UserActions: bindActionCreators(UserActions, dispatch)
  })
)(TableWithScroll)
