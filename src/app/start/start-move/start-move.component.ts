import { CommonModule } from "@angular/common";
import { Component, EventEmitter, OnDestroy, OnInit, Output } from "@angular/core";
import { StartService } from "../start.service";
import { FormBuilder, FormControl, FormControlStatus, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { Subject, takeUntil } from "rxjs";
import { MoveFormGroup, isFormValid } from "../start.model";
import { StartStoreService } from "../start-store.service";
import { StartValidationService } from "../start-validation.service";
import { AppConsts } from "../AppConsts";
import { DateTimeService } from "../date-time.service";
import { UiMaterialDatePickerModule } from "../ui-material-date-picker/ui-material-date-picker.module";
import { UtilDirectivesModule } from "../directive/util-directives.module";
import { DateTime } from "luxon";
import { ImageModule } from "../image/image.module";

@Component({
    selector: "app-start-move",
    templateUrl: "./start-move.component.html",
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        UiMaterialDatePickerModule,
        UtilDirectivesModule,
        ImageModule,
    ],
    providers: [StartService],
    host: {
        class: 'wizard_start_option'
    }
})
export class StartMoveComponent implements OnInit, OnDestroy {

    @Output() backClick = new EventEmitter<void>();

    public readonly onDestroy$ = new Subject();
    public minDate!: DateTime;
    public readonly maxZipCode = AppConsts.maxUsaPostalCodeLength;
    public readonly maxPromoCode = AppConsts.maxPromoCode;

    get startOptionForm(): FormGroup<MoveFormGroup | any> {
        return this._startStoreService.startFormsData.moveForm;
    }
    set startOptionForm(value: FormGroup<MoveFormGroup>) {
        this._startStoreService.startFormsData.moveForm = value;
    }

    constructor(
        private _fb: FormBuilder,
        private _startValidationService: StartValidationService,
        private _startStoreService: StartStoreService,
        private _dateTimeService: DateTimeService,
    ) {
        this._initForm();
    }

    ngOnInit(): void {
        (<FormGroup<MoveFormGroup>>this.startOptionForm).statusChanges
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
        this.startOptionForm = this._fb.group<MoveFormGroup>({
            zipFrom: new FormControl(null, [Validators.required, Validators.maxLength(AppConsts.maxUsaPostalCodeLength), Validators.minLength(AppConsts.maxUsaPostalCodeLength)]),
            zipTo: new FormControl(null, [Validators.required, Validators.maxLength(AppConsts.maxUsaPostalCodeLength), Validators.minLength(AppConsts.maxUsaPostalCodeLength)]),
            date: new FormControl(null, [Validators.required]),
            code: new FormControl(null),
        });
    }


}
