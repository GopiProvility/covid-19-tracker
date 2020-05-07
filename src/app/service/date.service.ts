import * as moment from 'moment';

export class DateService {
  static getYesterday() {
    const date = moment().subtract(1, 'day');
    return  date.format('MM-DD-YYYY');
}
}
