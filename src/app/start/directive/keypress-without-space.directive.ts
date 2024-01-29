import { Directive, HostListener } from '@angular/core';

@Directive({ selector: 'input[withoutSpaces]' })
export class KeypressWithoutSpacesDirective {

    @HostListener('keypress', ['$event'])
    handleKeyPress(event: any) {
        return this._withoutSpaces(event);
    }

    private _withoutSpaces(event: any): boolean {
        const charCode = (event.which) ? event.which : event.keyCode;

        if (charCode === 32) { return false; }

        return true;
    }

}
