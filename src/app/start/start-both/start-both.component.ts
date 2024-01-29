import { CommonModule } from "@angular/common";
import { Component, EventEmitter, OnDestroy, OnInit, Output } from "@angular/core";
import { StartService } from "../start.service";
import { FormBuilder, FormControl, FormControlStatus, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { Subject, takeUntil } from "rxjs";
import { BothFormGroup, isFormValid } from "../start.model";
import { StartStoreService } from "../start-store.service";
import { StartValidationService } from "../start-validation.service";
import { StartStoreDictionaryService } from "../start-store-dictionary.service";
import { UtilDirectivesModule } from "../directive/util-directives.module";
import { AppConsts } from "../AppConsts";
import { UiMaterialDatePickerModule } from "../ui-material-date-picker/ui-material-date-picker.module";
import { DateTimeService } from "../date-time.service";
import { RadioListModule } from "../radio-list/radio-list.module";
import { RadioListModel } from "../radio-list/radio-list.model";
import { SelectModule } from "../select/select.module";
import { SelectModel } from "../select/select.model";
import { DateTime } from "luxon";

@Component({
    selector: "app-start-both",
    templateUrl: "./start-both.component.html",
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        UiMaterialDatePickerModule,
        UtilDirectivesModule,
        RadioListModule,
        SelectModule,
    ],
    providers: [StartService],
    host: {
        class: 'wizard_start_option'
    }
})
export class StartBothComponent implements OnInit, OnDestroy {

    @Output() backClick = new EventEmitter<void>();

    public readonly onDestroy$ = new Subject();
    public minDate!: DateTime;
    public readonly maxZipCode = AppConsts.maxUsaPostalCodeLength;
    public readonly maxPromoCode = AppConsts.maxPromoCode;

    get startOptionForm(): FormGroup<BothFormGroup | any> {
        return this._startStoreService.startFormsData.bothForm;
    }
    set startOptionForm(value: FormGroup<BothFormGroup>) {
        this._startStoreService.startFormsData.bothForm = value;
    }
    get storageLocation(): RadioListModel[] {
        return this._startStoreDictionaryService.storageLocation;
    }
    get storageDuration(): SelectModel[] {
        return this._startStoreDictionaryService.storageDuration;
    }

    constructor(
        private _fb: FormBuilder,
        private _startValidationService: StartValidationService,
        private _startStoreDictionaryService: StartStoreDictionaryService,
        private _startStoreService: StartStoreService,
        private _dateTimeService: DateTimeService,
    ) {
        this._initForm();
    }

    ngOnInit(): void {
        (<FormGroup<BothFormGroup>>this.startOptionForm).statusChanges
            .pipe(
                takeUntil(this.onDestroy$)
            )
            .subscribe((result: FormControlStatus) => {
                this._startValidationService.setValidStart(isFormValid(result));
            });
        this.minDate = this._dateTimeService.getEndOfDayPlusDays(7);
    }

    ngOnDestroy(): void {
        this.onDestroy$.next(null);
        this.onDestroy$.complete();
        this._startValidationService.setValidStart(false);
    }

    public onBack(): void {
        this.backClick.emit();
    }

    private _initForm(): void {
        this.startOptionForm = this._fb.group<BothFormGroup>({
            zipFrom: new FormControl(null, [Validators.required, Validators.maxLength(AppConsts.maxUsaPostalCodeLength), Validators.minLength(AppConsts.maxUsaPostalCodeLength)]),
            zipTo: new FormControl(null, [Validators.required, Validators.maxLength(AppConsts.maxUsaPostalCodeLength), Validators.minLength(AppConsts.maxUsaPostalCodeLength)]),
            date: new FormControl(null, [Validators.required]),
            code: new FormControl(null),
            duration: new FormControl(null, [Validators.required]),
            location: new FormControl(null, [Validators.required]),
        });
    }
}
