import { Directive, HostListener } from '@angular/core';

@Directive({ selector: 'input[numberOnly]' })
export class KeypressNumberOnlyDirective {

    @HostListener('keypress', ['$event'])
    handleKeyPress(event: any) {
        return this.numberOnly(event);
    }

    public numberOnly(event: any): boolean {
        const charCode = (event.which) ? event.which : event.keyCode;

        if (charCode < 48 || charCode > 57) { return false; }

        return true;
    }
}
