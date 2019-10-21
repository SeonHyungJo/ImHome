const downloadExcel = (req, res) => {
  const xl = require('excel4node');
  const wb = new xl.Workbook();
  const ws = wb.addWorksheet('Sheet 1');
  const style = wb.createStyle({
    font: {
      color: '#FF0800',
      size: 12
    },
    numberFormat: '$#,##0.00; ($#,##0.00); -'
  });

  ws.cell(1, 1).number(100).style(style);
  ws.cell(1, 2).number(200).style(style);
  ws.cell(1, 3).formula('A1 + B1').style(style);
  ws.cell(2, 1).string('string').style(style);
  ws.cell(3, 1).bool(true).style(style).style({ font: { size: 14 } });

  wb.write('ExcelFile.xlsx', res);
};

module.exports = downloadExcel;
