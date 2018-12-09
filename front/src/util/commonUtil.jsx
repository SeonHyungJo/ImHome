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
