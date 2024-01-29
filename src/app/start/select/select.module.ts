import { NgModule } from '@angular/core';
import { SelectComponent } from './select.component';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatCardModule,
        MatSelectModule,
        MatFormFieldModule,
    ],
    declarations: [
        SelectComponent,
    ],
    exports: [
        SelectComponent,
    ],
    providers: [],
})
export class SelectModule { }
