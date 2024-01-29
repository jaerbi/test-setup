import { Component, Input, OnDestroy } from "@angular/core";
import { StartStoreService } from "./start-store.service";
import { QuoteQueryInput, QuoteType } from "./start.model";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { DateTimeService } from "./date-time.service";
import { DateTime } from "luxon";

@Component({
    selector: "app-start",
    templateUrl: "./start.component.html",
    host: {
        class: 'main_wrapper'
    },
})
export class StartComponent implements OnDestroy {

    public readonly type = QuoteType;
    public isOption = false;
    public selectedType!: QuoteType;

    constructor(
        private _dateTimeService: DateTimeService,
        private _startStoreService: StartStoreService,
    ) {
    }

    ngOnDestroy(): void {
        this.isOption = false;
        this._startStoreService.resetData();
    }

    public onBack(): void {
        this.isOption = false;
    }

    public onSelectQuoteType(type: QuoteType): void {
        this.isOption = true;
        this.selectedType = type;
    }

    public onObjectForQuery(output: QuoteQueryInput): void {
        if (!environment.url) { return; }

        const { type, date, code, postalCodeFrom, postalCodeTo, emailAddress, storageLocation, storageDuration } = output;
        const url = `${environment.url}/quote`;
        const queryParams = {
            type, code: code ?? '', date: this._getDateString(date), emailAddress: emailAddress ?? '',
            postalCodeFrom, postalCodeTo, storageLocation: storageLocation ?? '', storageDuration: storageDuration ?? ''
        };
        const fullUrl = new URL(url);
        Object.entries(queryParams).forEach(([key, value]) => {
            fullUrl.searchParams.set(key, <any>value as string)
        });
        window.location.href = fullUrl.toString();
    }

    private _getDateString(date: DateTime | undefined): string {
        if (!date) { return ''; }

        const input = date.setLocale('en').toFormat('yyyy-MM-dd');

        return input;
    }
}
