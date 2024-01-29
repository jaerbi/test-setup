import { FormControl, FormControlStatus, FormGroup } from "@angular/forms";
import { DateTime } from "luxon";
import { AppConsts } from "./AppConsts";

export class MoveFormGroup {
    constructor(
        public zipFrom: FormControl<string | null>,
        public zipTo: FormControl<string | null>,
        public date: FormControl<any | null>,
        public code: FormControl<string | null>,
    ) { }
}
export class StorageFormGroup {
    constructor(
        public zipFrom: FormControl<string | null>,
        public date: FormControl<DateTime | null>,
        public code: FormControl<string | null>,
        public duration: FormControl<StorageDuration | null>,
        public location: FormControl<StorageLocation | null>,
    ) { }
}
export class BothFormGroup {
    constructor(
        public zipFrom: FormControl<string | null>,
        public zipTo: FormControl<string | null>,
        public date: FormControl<any | null>,
        public code: FormControl<string | null>,
        public duration: FormControl<StorageDuration | null>,
        public location: FormControl<StorageLocation | null>,
    ) { }
}

export class StartFormsData {

    constructor(
        public moveForm: FormGroup<MoveFormGroup | any>,
        public storageForm: FormGroup<StorageFormGroup | any>,
        public bothForm: FormGroup<BothFormGroup | any>,
    ) { }
}

export class QuoteQueryInput {
    type!: QuoteType;
    date!: DateTime | undefined;
    storageLocation!: StorageLocation;
    storageDuration!: StorageDuration;
    code!: string | undefined;
    emailAddress!: string | undefined;
    postalCodeFrom!: string;
    postalCodeTo!: string;

    constructor(
    ) { }
}

export enum StorageDuration {
    LessThree = 0,
    ThreeToSix = 1,
    SixToTwelve = 2,
    MoreTwelve = 3,
}

export enum StorageLocation {
    OnSite = 0,
    Warehouse = 1,
}

export enum QuoteType {
    Move = 0,
    Storage = 1,
    Both = 2,
}

export function isFormValid(status: FormControlStatus): boolean {
    const isValid = status === AppConsts.formValidStatus;

    return isValid;
}
