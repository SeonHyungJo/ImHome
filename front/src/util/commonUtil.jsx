import moment from 'moment';

export function setDate(str) {
  return moment(str).format('YYYY-MM-DD HH:mm:ss');
}

export function setTotalDate(str) {
  return moment(str).format('YYYY-MM-DD');
}

export function setTotalTime(str) {
  return moment(str).format('HH:mm:ss');
}

export function setHangleDateTime(str) {
  return moment(str).format('YYYY.MM.DD HH시mm분');
}

export function setHangleDate(str) {
  return moment(str).format('YYYY년 MM월 DD일');
}

export function setCostFormat(num) {
  const cost = Number(num);
  return cost.toLocaleString();
}

export function getEndOfDay(year, month) {
  return moment()
    .year(year)
    .month(month)
    .endOf('month')
    .toDate();
}

export function getTotalCost(items) {
  return (
    items
    && items.reduce(
      (total, order) => parseInt(order.itemCount, 10) * parseInt(order.itemCost, 10) + total,
      0,
    )
  );
}
