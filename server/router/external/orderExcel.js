const commonUtil = require('./commonUtil');

export function getOrderExcel(orderList, startDate, endDate, res) {
    var xl = require('excel4node');
    //var fileName = `${orderList[0]['branchName']} 거래내역_${commonUtil.setRawDate(startDate)}~${commonUtil.setRawDate(endDate)}.xlsx`;

    var wb = new xl.Workbook();

    var ws = wb.addWorksheet('Sheet 1');

    var style = wb.createStyle({
        font: {
            color: '#666666',
            size: 12,
        },
        alignment: {
            horizontal: ['center'],
            vertical: ['center']
        },
        numberFormat: '#,##0; (#,##0); -',
    });

    //4번쨰, 5번째 셀 너비 지정
    ws.column(4).setWidth(23);
    ws.column(5).setWidth(13);
    //Header 셀 지정
    ws.cell(1, 1)
        .string("거래일자")
        .style(style);

    ws.cell(1, 2)
        .string("거래시간")
        .style(style);

    ws.cell(1, 3)
        .string("거래처")
        .style(style);

    ws.cell(1, 4)
        .string("거래명세표 발행건수")
        .style(style);

    ws.cell(1, 5)
        .string("거래금액(원)")
        .style(style);

    let total = 0;

    if (orderList.length <= 0) {
        ws.cell(2, 1, 2, 5, true)
            .string('데이터가 없습니다.')
            .style(style)
    } else {
        const totalRow = orderList.length + 2;

        orderList.map((item, index) => {
            ws.cell(index + 2, 1)
                .string(commonUtil.setTotalDate(item.updatedAt))
                .style(style);

            ws.cell(index + 2, 2)
                .string(commonUtil.setTotalTime(item.updatedAt))
                .style(style);

            ws.cell(index + 2, 3)
                .string(item.branchName)
                .style(style);

            ws.cell(index + 2, 4)
                .string(item.bNumber ? item.bNumber : '-')
                .style(style);

            ws.cell(index + 2, 5)
                .number(commonUtil.getTotalCost(item.items))
                .style(style);
            total += commonUtil.getTotalCost(item.items);
        })

        ws.cell(totalRow, 1, totalRow, 3, true)
            .string('Total')
            .style(style)

        ws.cell(totalRow, 4)
            .string('총 발행건수')
            .style(style)

        ws.cell(totalRow, 5)
            .number(total)
            .style(style)
    }
    wb.write('Excel', res);
}