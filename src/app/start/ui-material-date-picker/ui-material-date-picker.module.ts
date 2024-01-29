import { NgModule } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UiMaterialDatePickerComponent } from './ui-material-date-picker.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatLuxonDateModule } from '@angular/material-luxon-adapter';
import { UiMaterialDatePickerService } from './ui-material-date-picker.service';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatLuxonDateModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatInputModule,
    ],
    declarations: [UiMaterialDatePickerComponent],
    exports: [UiMaterialDatePickerComponent],
    providers: [UiMaterialDatePickerService]
})
export class UiMaterialDatePickerModule { }
