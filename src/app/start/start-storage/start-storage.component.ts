import { CommonModule } from "@angular/common";
import { Component, EventEmitter, OnDestroy, OnInit, Output } from "@angular/core";
import { StartService } from "../start.service";
import { FormBuilder, FormControl, FormControlStatus, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { Subject, takeUntil } from "rxjs";
import { StorageFormGroup, isFormValid } from "../start.model";
import { StartStoreService } from "../start-store.service";
import { StartValidationService } from "../start-validation.service";
import { StartStoreDictionaryService } from "../start-store-dictionary.service";
import { SelectModule } from "../select/select.module";
import { RadioListModule } from "../radio-list/radio-list.module";
import { DateTimeService } from "../date-time.service";
import { SelectModel } from "../select/select.model";
import { RadioListModel } from "../radio-list/radio-list.model";
import { AppConsts } from "../AppConsts";
import { UtilDirectivesModule } from "../directive/util-directives.module";
import { UiMaterialDatePickerModule } from "../ui-material-date-picker/ui-material-date-picker.module";
import { DateTime } from "luxon";
import { ImageModule } from "../image/image.module";

@Component({
    selector: "app-start-storage",
    templateUrl: "./start-storage.component.html",
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        UiMaterialDatePickerModule,
        UtilDirectivesModule,
        RadioListModule,
        SelectModule,
        ImageModule,
    ],
    providers: [StartService],
    host: {
        class: 'wizard_start_option'
    }
})
export class StartStorageComponent implements OnInit, OnDestroy {

    @Output() backClick = new EventEmitter<void>();

    public readonly onDestroy$ = new Subject();
    public minDate!: DateTime;
    public readonly maxZipCode = AppConsts.maxUsaPostalCodeLength;
    public readonly maxPromoCode = AppConsts.maxPromoCode;

    get startOptionForm(): FormGroup<StorageFormGroup | any> {
        return this._startStoreService.startFormsData.storageForm;
    }
    set startOptionForm(value: FormGroup<StorageFormGroup>) {
        this._startStoreService.startFormsData.storageForm = value;
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
        (<FormGroup<StorageFormGroup>>this.startOptionForm).statusChanges
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
        this.startOptionForm = this._fb.group<StorageFormGroup>({
            zipFrom: new FormControl(null, [Validators.required, Validators.maxLength(AppConsts.maxUsaPostalCodeLength), Validators.minLength(AppConsts.maxUsaPostalCodeLength)]),
            date: new FormControl(null, [Validators.required]),
            code: new FormControl(null),
            duration: new FormControl(null, [Validators.required]),
            location: new FormControl(null, [Validators.required]),
        });
        // if need init on start
        // setTimeout(() => {
        //     (this.startOptionForm.get('location') as FormControl).setValue(this.storageLocation[0]);
        // });
    }
}
