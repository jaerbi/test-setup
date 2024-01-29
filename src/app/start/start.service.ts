import { Injectable } from "@angular/core";
import { StartStoreService } from "./start-store.service";
import { QuoteQueryInput, QuoteType, StartFormsData } from "./start.model";

@Injectable()
export class StartService {

    constructor(
        private _startStoreService: StartStoreService,
    ) { }

    public getObjectForQuery(type: QuoteType): QuoteQueryInput {
        const input: QuoteQueryInput = new QuoteQueryInput();
        input.type = type;
        const data: StartFormsData = this._startStoreService.startFormsData;
        const { moveForm, storageForm, bothForm } = data;

        if (type === QuoteType.Move) {
            input.date = moveForm.controls['date'].value;
            input.code = moveForm.controls['code'].value;
            input.postalCodeFrom = moveForm.controls['zipFrom'].value;
            input.postalCodeTo = moveForm.controls['zipTo'].value;
        }

        if (type === QuoteType.Storage) {
            input.date = storageForm.controls['date'].value;
            input.code = storageForm.controls['code'].value;
            input.postalCodeFrom = storageForm.controls['zipFrom'].value;
            input.storageLocation = storageForm.controls['location'].value.value;
            input.storageDuration = storageForm.controls['duration'].value.value;
        }

        if (type === QuoteType.Both) {
            input.date = bothForm.controls['date'].value;
            input.code = bothForm.controls['code'].value;
            input.postalCodeFrom = bothForm.controls['zipFrom'].value;
            input.postalCodeTo = bothForm.controls['zipTo'].value;
            input.storageLocation = bothForm.controls['location'].value.value;
            input.storageDuration = bothForm.controls['duration'].value.value;
        }

        return input;
    }
}
