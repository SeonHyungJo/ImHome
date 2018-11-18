import React from 'react';
import { ViewWrapper, ViewWithContent } from './';

class ViewForUser extends React.Component {

    render() {

        return (
            <ViewWrapper title={this.props.viewTitle}>
                <ViewWithContent>
                    <tr>
                        <th>지점명</th>
                        <td>{this.props.viewData.storeName}</td>
                        <th></th>
                        <td></td>
                    </tr>
                    <tr>
                        <th>대표자</th>
                        <td>{this.props.viewData.custName}</td>
                        <th>아이디</th>
                        <td>{this.props.viewData.custId}</td>
                    </tr>
                    <tr>
                        <th>회사명</th>
                        <td>{this.props.viewData.companyName}</td>
                        <th>사업자 번호</th>
                        <td>{this.props.viewData.businessNum}</td>
                    </tr>
                    <tr>
                        <th>사업장 주소</th>
                        <td>{this.props.viewData.storeAddress}</td>
                        <th>이메일 주소</th>
                        <td>{this.props.viewData.custEmail}</td>
                    </tr>
                    <tr>
                        <th>사업장 연락처</th>
                        <td>{this.props.viewData.storePhone}</td>
                        <th>사업주 연락처</th>
                        <td>{this.props.viewData.custPhone}</td>
                    </tr>
                </ViewWithContent>
            </ViewWrapper>

        );
    }
}

export default ViewForUser;
