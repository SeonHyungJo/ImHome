// Require library
const xl = require('excel4node');

//https://www.npmjs.com/package/excel4node
exports.downloadExcel = (req, res) => {
  const reqDate = req.body;
  const branchName = reqDate.branchName;
  const items = reqDate.specificationItems;
  const today = reqDate.date;

  const deafultRowCount = 13;

  const workbook = new xl.Workbook();
  const ws = workbook.addWorksheet('Sheet 1');

  const BLACK_THINK_BORDER = {
    style: 'medium',
    color: '#000000'
  };

  const BLACK_DOTTED_BORDER = {
    style: 'dotted',
    color: '#000000'
  };

  const GRAY_THINK_BORDER = {
    style: 'thin',
    color: '#333333'
  };

  const GRAY_BACKGOUND = workbook.createStyle({
    fill: {
      type: 'pattern',
      patternType: 'solid',
      bgColor: '#808080',
      fgColor: '#808080'
    }
  });

  const totalCurrencyStyle = workbook.createStyle({
    font: {
      size: 14
    },
    alignment: {
      horizontal: 'left',
      vertical: 'center'
    },
    numberFormat: '￦#,##0; (￦#,##0); -'
  });

  const currencyStyle = workbook.createStyle({
    font: {
      size: 10
    },
    numberFormat: '￦#,##0; (￦#,##0); -'
  });

  const FONT = {
    title: workbook.createStyle({
      font: {
        size: 22,
        bold: true
      }
    }),
    sub_title_master: workbook.createStyle({
      font: {
        size: 14,
        bold: false,
        underline: true
      }
    }),
    sub_title_branch: workbook.createStyle({
      font: {
        size: 14,
        bold: true
      }
    }),
    content: workbook.createStyle({
      font: {
        size: 12
      }
    }),
    content_list: workbook.createStyle({
      font: {
        size: 10
      }
    }),
    total_name: workbook.createStyle({
      font: {
        size: 14
      },
      alignment: {
        horizontal: 'right',
        vertical: 'center'
      }
    })
  };

  const BORDER_MAKER = style => ({
    top: workbook.createStyle({
      border: {
        top: style
      }
    }),
    bottom: workbook.createStyle({
      border: {
        bottom: style
      }
    }),
    right: workbook.createStyle({
      border: {
        right: style
      }
    }),
    left: workbook.createStyle({
      border: {
        left: style
      }
    })
  });

  const COMMON_BORDER = BORDER_MAKER(BLACK_THINK_BORDER);
  const TOTAL_BORDER = BORDER_MAKER(GRAY_THINK_BORDER);
  const COMMON_DOTTED_BORDER = BORDER_MAKER(BLACK_DOTTED_BORDER);

  //BackGround 작업 진행
  ws.cell(7, 3, 10, 5).style(GRAY_BACKGOUND);
  ws.cell(32, 5, 33, 8).style(GRAY_BACKGOUND);

  // 외곽 Border 작업(2, 2, 37, 9)
  // (Border Line Styles) ['none', 'thin', 'medium', 'dashed', 'dotted', 'thick', 'double', 'hair', 'mediumDashed', 'dashDot', 'mediumDashDot', 'dashDotDot', 'mediumDashDotDot', 'slantDashDot']
  ws.cell(2, 2, 2, 9).style(COMMON_BORDER.top);
  ws.cell(2, 9, 37, 9).style(COMMON_BORDER.right);
  ws.cell(37, 2, 37, 9).style(COMMON_BORDER.bottom);
  ws.cell(2, 2, 37, 2).style(COMMON_BORDER.left);

  ws.cell(3, 3, 3, 8).style(COMMON_DOTTED_BORDER.top);
  ws.cell(3, 8, 36, 8).style(COMMON_DOTTED_BORDER.right);
  ws.cell(36, 3, 36, 8).style(COMMON_DOTTED_BORDER.bottom);
  ws.cell(3, 3, 36, 3).style(COMMON_DOTTED_BORDER.left);

  // 지점명 외곽 Border 작업(6, 3, 9, 5)
  ws.cell(7, 3, 7, 5).style(COMMON_BORDER.top);
  ws.cell(7, 5, 10, 5).style(COMMON_BORDER.right);
  ws.cell(10, 3, 10, 5).style(COMMON_BORDER.bottom);
  ws.cell(7, 3, 10, 3).style(COMMON_BORDER.left);

  // 공급자 외곽 Border 작업(6, 6, 9, 8)
  ws.cell(7, 6, 7, 8).style(COMMON_BORDER.top);
  ws.cell(7, 8, 10, 8).style(COMMON_BORDER.right);
  ws.cell(10, 6, 10, 8).style(COMMON_BORDER.bottom);
  ws.cell(7, 6, 10, 6).style(COMMON_BORDER.left);

  // 품목 외곽 Dotted Border 작업(11, 3, 11, 8)
  ws.cell(12, 3, 12, 8).style(COMMON_DOTTED_BORDER.bottom);

  // 합계 외곽 Border 작업(31, 3, 32, 8)
  ws.cell(32, 3, 32, 8).style(TOTAL_BORDER.top);
  ws.cell(32, 8, 33, 8).style(TOTAL_BORDER.right);
  ws.cell(33, 3, 33, 8).style(TOTAL_BORDER.bottom);
  ws.cell(32, 3, 33, 3).style(TOTAL_BORDER.left);

  ws.cell(32, 4, 33, 4).style(TOTAL_BORDER.right);

  // Setting Default Space Cell SIZE
  ws.column(2).setWidth(3);
  ws.column(9).setWidth(3);

  // 거래명세표(3,3)
  ws.cell(4, 3, 4, 8, true)
    .string('거래명세표')
    .style(FONT.title);

  // 거래 날짜(4,3)
  ws.cell(5, 3)
    .string(today)
    .style(FONT.content);

  // 공급받는자용(4, 8)
  ws.cell(5, 7, 5, 8, true)
    .string('공급받는자용')
    .style(FONT.content);

  // 지점명(7,3), (7,4), (7,5), (9,3) ~ (9,6)
  ws.cell(8, 3)
    .string('아임홈')
    .style(FONT.sub_title_branch);

  ws.cell(8, 4)
    .string(branchName)
    .style(FONT.sub_title_branch);

  ws.cell(8, 5)
    .string('귀하')
    .style(FONT.sub_title_branch);

  ws.cell(10, 3, 10, 5, true)
    .string('아래와 같이 계산합니다.')
    .style(FONT.content);

  // 공급자 정보(6,6), (7,6), (6,7), (8,6), (9,6)
  ws.cell(7, 6)
    .string('공급자')
    .style(FONT.sub_title_master);
  ws.cell(7, 7, 7, 8, true)
    .string('(주) 아임홈본사')
    .style(FONT.sub_title_master);
  ws.cell(8, 6)
    .string('등록번호')
    .style(FONT.content);
  ws.cell(8, 7)
    .string('222-222-22222')
    .style(FONT.content);
  ws.cell(9, 6)
    .string('업태')
    .style(FONT.content);
  ws.cell(9, 7)
    .string('제조/도 소매')
    .style(FONT.content);
  ws.cell(10, 6)
    .string('사업장')
    .style(FONT.content);
  ws.cell(10, 7)
    .string('성남시 분당구 백현동 582-8번지 1층')
    .style(FONT.content);

  // 품목리스트
  // Header
  ws.cell(12, 3)
    .string('품목')
    .style(FONT.content);
  ws.cell(12, 5)
    .string('수량')
    .style(FONT.content);
  ws.cell(12, 6)
    .string('단가')
    .style(FONT.content);
  ws.cell(12, 7)
    .string('공급가액')
    .style(FONT.content);
  ws.cell(12, 8)
    .string('세액')
    .style(FONT.content);

  // 품목리스트 출력
  let totalCost = 0;
  for (let row = 0; row < items.length; row++) {
    const element = items[row];
    const elementTotalCost = element.itemCount * element.itemCost;
    totalCost += elementTotalCost;

    ws.cell(deafultRowCount + row, 3)
      .string(element.itemName)
      .style(FONT.content);
    ws.cell(deafultRowCount + row, 5)
      .number(parseInt(element.itemCount))
      .style(FONT.content);
    ws.cell(deafultRowCount + row, 6)
      .number(parseInt(element.itemCost))
      .style(currencyStyle);
    ws.cell(deafultRowCount + row, 7)
      .number(parseInt(element.itemCost))
      .style(currencyStyle);
    ws.cell(deafultRowCount + row, 8)
      .number(elementTotalCost)
      .style(currencyStyle);
  }

  // 합계(위치가 유동적)
  ws.cell(32, 3, 33, 4, true)
    .string('합계')
    .style(FONT.total_name);
  ws.cell(32, 5, 33, 8, true)
    .number(totalCost)
    .style(totalCurrencyStyle);

  // 도착지(위치가 유동적)
  ws.cell(35, 3)
    .string('도착지')
    .style(FONT.content);
  ws.cell(35, 4)
    .string('경기도 성남시 분당구 성남대로 208번길 1층')
    .style(FONT.content);

  // 공급자(위치가 유동적)
  ws.cell(36, 3)
    .string('공급자')
    .style(FONT.content);
  ws.cell(36, 4)
    .string('010-2222-2222')
    .style(FONT.content);

  workbook.write('SpecifyExcel.xlsx', res);
};
