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
  const cost = num;
  return cost.toLocaleString();
}

export function getEndOfDay(year, month) {
  return moment()
    .year(year)
    .month(month)
    .endOf('month')
    .toDate();
}
