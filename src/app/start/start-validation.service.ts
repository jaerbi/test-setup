import { BehaviorSubject, Observable } from "rxjs";

export class StartValidationService {
    private _isValidStart = new BehaviorSubject<boolean>(false);

    public setValidStart(state: boolean): void {
        this._isValidStart.next(state);
    }

    public getValidStart$(): Observable<boolean> {
        return this._isValidStart.asObservable();
    }
}
