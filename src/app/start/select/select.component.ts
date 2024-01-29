import { Component, EventEmitter, Input, OnInit, Output, forwardRef } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { SelectModel } from "./select.model";
import { MatSelectChange } from "@angular/material/select";

@Component({
    selector: "app-select",
    templateUrl: "./select.component.html",
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SelectComponent),
            multi: true,
        }
    ],
    host: {
        class: 'select shadow-base'
    }
})

export class SelectComponent implements ControlValueAccessor, OnInit {

    @Input() disabled = false;
    @Input() placeholder = 'select element';
    @Input() items: SelectModel[] = [];

    @Output() valueChange = new EventEmitter<SelectModel>();

    public value!: SelectModel;
    onTouched!: () => {};
    onChange!: (_: SelectModel) => {};

    constructor(
    ) {
    }

    writeValue(value: SelectModel): void {
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

    ngOnInit() {

    }

    public selectionChanged(event: MatSelectChange): void {
        this.value = event.value;
        this.onChange(event.value);
        this.onTouched();
    }

    public onValueChange(event: any): void {
        this.value = event;
        this.onChange(this.value);
    }
}
