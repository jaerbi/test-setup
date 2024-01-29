import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { StartService } from "../start.service";
import { Observable } from "rxjs";
import { StartMoveComponent } from "../start-move/start-move.component";
import { StartValidationService } from "../start-validation.service";
import { StartStorageComponent } from "../start-storage/start-storage.component";
import { StartBothComponent } from "../start-both/start-both.component";
import { ImageModule } from "../image/image.module";
import { QuoteQueryInput, QuoteType } from "../start.model";

@Component({
    selector: "app-start-option",
    templateUrl: "./start-option.component.html",
    standalone: true,
    imports: [
        CommonModule,
        ImageModule,
        StartMoveComponent,
        StartStorageComponent,
        StartBothComponent,
    ],
    providers: [StartService],
    host: {
        class: 'wizard_start_option'
    }
})
export class StartOptionComponent implements OnInit {

    @Output() objectForQuery = new EventEmitter<QuoteQueryInput>();
    @Output() backClick = new EventEmitter();

    @Input() type!: QuoteType;

    public readonly quoteType = QuoteType;

    get isValid$(): Observable<boolean> {
        return this._startValidationService.getValidStart$();
    }

    constructor(
        private _startService: StartService,
        private _startValidationService: StartValidationService,
    ) {
    }

    ngOnInit(): void {

    }

    public onBack(): void {
        this.backClick.emit();
    }

    public start(): void {
        const input: QuoteQueryInput = this._startService.getObjectForQuery(this.type);
        this.objectForQuery.emit(input);
    }

}
