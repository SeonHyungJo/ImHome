import moment from 'moment';

export function setDate(str) {
    return moment(str).format('YYYY-MM-DD HH:mm:ss');
}