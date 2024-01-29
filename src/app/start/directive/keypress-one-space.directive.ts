import { Directive, HostListener } from '@angular/core';

@Directive({ selector: 'input[justOneSpace]' })
export class KeypressOneSpaceDirective {

    @HostListener('keypress', ['$event'])
    handleKeyPress(event: any) {
        return this._justOneSpaces(event);
    }

    private _justOneSpaces(event: any): boolean {
        const charCode = (event.which) ? event.which : event.keyCode;
        const target = event.target

        if (charCode === 32 && (target.value[target.selectionEnd - 1] == " " || target.value[target.selectionEnd] == " ")) { return false; }

        return true;
    }

}
