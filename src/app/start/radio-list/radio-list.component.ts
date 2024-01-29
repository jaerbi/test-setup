import { ChangeDetectorRef, Component, Input, OnInit, forwardRef } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { RadioListModel } from "./radio-list.model";

@Component({
    selector: "app-radio-list",
    templateUrl: "./radio-list.component.html",
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => RadioListComponent),
            multi: true,
        }
    ],
})

export class RadioListComponent implements ControlValueAccessor, OnInit {

    @Input() disabled = false;
    @Input() list: RadioListModel[] = [];

    public value: any;

    onTouched!: () => {};
    onChange!: (_: any) => {};

    constructor(
        private _cdr: ChangeDetectorRef,
    ) { }

    writeValue(value: any): void {
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

    public onValueChange(event: any): void {
        this.value = event;
        this.onChange(this.value);
    }

    public isMoreChange(): void {
        this._cdr.detectChanges();
    }
}
