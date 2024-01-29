import { Injectable } from '@angular/core';
import { LuxonDateAdapter } from '@angular/material-luxon-adapter';

@Injectable()
export class UiMaterialDatePickerService extends LuxonDateAdapter {
    override getDayOfWeekNames(style: 'long' | 'short' | 'narrow') {
        return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    }
}
