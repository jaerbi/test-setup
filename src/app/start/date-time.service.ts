import { DateTime } from 'luxon';

export class DateTimeService {

    public getEndOfDayPlusDays(daysFromNow: number): DateTime {
        let date = DateTime.local();
        let newDate = this._plusDays(date, daysFromNow);

        return this._getEndOfDayForDate(newDate);
    }

    private _plusDays(date: DateTime | Date, dayCount: number): DateTime {
        if (date instanceof Date) {
            return this._plusDays(this._fromJSDate(date), dayCount);
        }

        return date.plus({ days: dayCount });
    }

    private _fromJSDate(date: Date): DateTime {
        return DateTime.fromJSDate(date);
    }

    private _getEndOfDayForDate(date: DateTime | Date): DateTime {
        if (!date) {
            return date as DateTime;
        }

        if (date instanceof Date) {
            return this._getEndOfDayForDate(this._fromJSDate(date));
        }

        return date.endOf('day');
    }
}
