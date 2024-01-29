import { NgModule } from '@angular/core';
import { RadioListComponent } from './radio-list.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { RadioListAllowedPipe } from './pipes/radio-list.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatRadioModule,
        MatCardModule,
    ],
    declarations: [
        RadioListComponent,
        RadioListAllowedPipe,
    ],
    exports: [
        RadioListComponent,
    ],
    providers: [],
})
export class RadioListModule { }
