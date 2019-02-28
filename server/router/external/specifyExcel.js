// Require library
const xl = require('excel4node');

//https://www.npmjs.com/package/excel4node
exports.downloadExcel = (req, res) => {
  const workbook = new xl.Workbook();
  const ws = workbook.addWorksheet('Sheet 1');

  const style = workbook.createStyle({
    font: {
      color: '#FF0800',
      size: 12
    },
    numberFormat: '$#,##0.00; ($#,##0.00); -'
  });

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

  // 거래명세표(3,3)
  ws.cell(3, 3).string('거래명세표');

  // 거래 날짜(4,3)
  ws.cell(4, 3).string('{날짜}');

  // 공급받는자용(4, 8)
  ws.cell(4, 8).string('공급받는자용');

  // 지점명(7,3), (7,4), (7,5), (9,3) ~ (9,6)
  ws.cell(7, 3).string('아임홈');
  ws.cell(7, 4).string('{지점명}');
  ws.cell(7, 5).string('귀하');
  ws.cell(9, 3, 9, 5, true).string('아래와 같이 계산합니다.');

  // 공급자 정보(6,6), (7,6), (6,7), (8,6), (9,6)
  ws.cell(6, 6).string('공급자');
  ws.cell(6, 7, 6, 8, true).string('(주) 아임홈본사');
  ws.cell(7, 6).string('등록번호');
  ws.cell(7, 7).string('{등록번호}');
  ws.cell(8, 6).string('업체');
  ws.cell(8, 7).string('{업체}');
  ws.cell(9, 6).string('사업장');
  ws.cell(9, 7).string('{사업장}');

  // 품목리스트
  // Header
  ws.cell(11, 3).string('품목');
  ws.cell(11, 5).string('수량');
  ws.cell(11, 6).string('단가');
  ws.cell(11, 7).string('공급가액');
  ws.cell(11, 8).string('세액');

  // 합계(위치가 유동적)
  ws.cell(31, 3, 32, 4, true).string('합계');
  ws.cell(31, 5, 32, 8, true).string('\\');

  // 도착지(위치가 유동적)
  ws.cell(34, 3).string('도착지');
  ws.cell(34, 4).string('{도착지}');

  // 공급자(위치가 유동적)
  ws.cell(35, 3).string('공급자');
  ws.cell(35, 4).string('{공급자}');

  // 외곽 Border 작업(2, 2, 37, 9)
  // (Border Line Styles) ['none', 'thin', 'medium', 'dashed', 'dotted', 'thick', 'double', 'hair', 'mediumDashed', 'dashDot', 'mediumDashDot', 'dashDotDot', 'mediumDashDotDot', 'slantDashDot']
  ws.cell(2, 2, 2, 9).style(COMMON_BORDER.top);
  ws.cell(2, 9, 37, 9).style(COMMON_BORDER.right);
  ws.cell(37, 2, 37, 9).style(COMMON_BORDER.bottom);
  ws.cell(2, 2, 37, 2).style(COMMON_BORDER.left);

  // 지점명 외곽 Border 작업(6, 3, 9, 5)
  ws.cell(6, 3, 6, 5).style(COMMON_BORDER.top);
  ws.cell(6, 5, 9, 5).style(COMMON_BORDER.right);
  ws.cell(9, 3, 9, 5).style(COMMON_BORDER.bottom);
  ws.cell(6, 3, 9, 3).style(COMMON_BORDER.left);

  // 공급자 외곽 Border 작업(6, 6, 9, 8)
  ws.cell(6, 6, 6, 8).style(COMMON_BORDER.top);
  ws.cell(6, 8, 9, 8).style(COMMON_BORDER.right);
  ws.cell(9, 6, 9, 8).style(COMMON_BORDER.bottom);
  ws.cell(6, 6, 9, 6).style(COMMON_BORDER.left);

  // 품목 외곽 Border 작업(11, 3, 11, 8)
  ws.cell(11, 3, 11, 8).style(COMMON_DOTTED_BORDER.bottom);

  // 합계 외곽 Border 작업(31, 3, 32, 8)
  ws.cell(31, 3, 31, 8).style(TOTAL_BORDER.top);
  ws.cell(31, 8, 32, 8).style(TOTAL_BORDER.right);
  ws.cell(32, 3, 32, 8).style(TOTAL_BORDER.bottom);
  ws.cell(31, 3, 32, 3).style(TOTAL_BORDER.left);

  ws.cell(31, 4, 32, 4).style(TOTAL_BORDER.right);

  //Merge
  //ws.cell(1, 2, 1, 3, true).string("Merge Cell B").style(storeStyle);

  // Set value of cell A1 to 100 as a number type styled with paramaters of style
  // ws.cell(1, 1).string('test');
  // //.number(100);
  // //.style(style);

  // // Set value of cell B1 to 200 as a number type styled with paramaters of style
  // ws.cell(1, 2)
  //   .number(200)
  //   .style(style);

  // // Set value of cell C1 to a formula styled with paramaters of style
  // ws.cell(1, 3)
  //   .formula('A1 + B1')
  //   .style(style);

  // // Set value of cell A2 to 'string' styled with paramaters of style
  // ws.cell(2, 1)
  //   .string('string')
  //   .style(style);

  // // Set value of cell A3 to true as a boolean type styled with paramaters of style but with an adjustment to the font size.
  // ws.cell(3, 1)
  //   .bool(true)
  //   .style(style)
  //   .style({ font: { size: 14 } });

  workbook.write('SpecifyExcel.xlsx', res);
};
