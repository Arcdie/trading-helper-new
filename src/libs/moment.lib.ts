import moment from 'moment';

export class MomentLib {
  static getStartOfMinute(date: Date) {
    return moment(date).utc().startOf('minute').toISOString();
  }
}
