import { Component, EventEmitter, HostBinding, Input, Output, forwardRef } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS, MatDateFormats } from '@angular/material/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { cloneDeep } from 'lodash-es';
import { DateTime } from 'luxon';
import { UiMaterialDatePickerService } from './ui-material-date-picker.service';
import { ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors } from '@angular/forms';

export const DATE_FORMATS: MatDateFormats = {
    parse: {
        dateInput: 'LL/dd/yyyy',
    },
    display: {
        dateInput: 'EEEE, dd MMMM y',
        monthYearLabel: 'LLLL y',
        dateA11yLabel: 'EEE',
        monthYearA11yLabel: 'LLLL yyyy'
    },
};

@Component({
    selector: 'ui-material-date-picker',
    templateUrl: 'ui-material-date-picker.component.html',
    providers: [
        { provide: DateAdapter, useClass: UiMaterialDatePickerService },
        { provide: MAT_DATE_FORMATS, useValue: DATE_FORMATS },
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => UiMaterialDatePickerComponent),
            multi: true,
        },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => UiMaterialDatePickerComponent),
            multi: true,
        }
    ]
})
export class UiMaterialDatePickerComponent implements ControlValueAccessor {

    @HostBinding('class.disabled')
    @Input() disabled!: boolean;
    @Input() minDate!: DateTime;
    @Input() maxDate!: DateTime;
    @Input() isClear = false;
    @Input() showInfo = false;

    @Input() placeholder = 'Select a date';

    @Output() dateChange = new EventEmitter<DateTime | null>();

    value!: DateTime;

    onTouched!: () => {};
    onChange!: (_: any) => {};
    writeValue(value: DateTime): void {
        this.value = value;
    }
    registerOnChange(fn: any): void {
        this.onChange = fn || (() => { });
    }
    registerOnTouched(fn: any): void {
        this.onTouched = fn || (() => { });
    }
    setDisabledState?(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }
    validate(control: FormControl<DateTime>): ValidationErrors | null {
        if (control.invalid) { return this._returnError(); }

        if (!control.value) { return this._returnError(); }

        return null;
    }

    public onDateChange(event: MatDatepickerInputEvent<DateTime>): void {
        if (this.disabled) { return; }

        const clone = cloneDeep(event.value);

        if (!clone) {
            this.dateChange.emit(null);
            return;
        }

        const year = clone.year;
        const month = clone.month;
        const day = clone.day;

        this.value = this._createMiddayDate(year, month, day);
        this.onChange(this.value);
        this.dateChange.emit(this.value);
    }


    public onClear(): void {
        if (!this.value || this.disabled) { return; }

        this.dateChange.emit(null);
    }

    private _returnError(): ValidationErrors {
        return { invalid: true };
    }

    private _createMiddayDate(year: number, month: number, day: number): DateTime {
        return DateTime.local(year, month, day, 12);
    }
}
