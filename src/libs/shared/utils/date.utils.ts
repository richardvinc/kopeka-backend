import { DateTime } from 'luxon';

export class DateUtils {
  static locale = 'Asia/Jakarta';

  static addHours(date: Date, hours: number): Date {
    return DateTime.fromJSDate(date).plus({ hours }).toJSDate();
  }

  static addDays(date: Date, days: number): Date {
    return DateTime.fromJSDate(date).plus({ days }).toJSDate();
  }

  static getCurrentLocalDate(): Date {
    return DateTime.now().setZone(this.locale).toJSDate();
  }

  static getLocalEndOfDay(date: Date): Date {
    return DateTime.fromJSDate(date)
      .endOf('day')
      .setZone(this.locale)
      .toJSDate();
  }

  static toEpoch(date: Date): number {
    return DateTime.fromJSDate(date).toMillis();
  }
}
