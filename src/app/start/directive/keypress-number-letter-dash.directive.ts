import { Directive, HostListener } from '@angular/core';

@Directive({ selector: 'input[numberLetterDashOnly]' })
export class KeypressNumberLetterDashDirective {

    @HostListener('keypress', ['$event'])
    handleKeyPress(event: any) {
        return this.numberLetterDashOnly(event);
    }

    public numberLetterDashOnly(event: any): boolean {
        const charCode = (event.which) ? event.which : event.keyCode;
        const digits = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57];
        const allowedChars = [
            ...digits, // numbers
            ...Array(26).fill(0).map((_, i) => 65 + i), // Letters (A-Z, a-z)
            ...Array(26).fill(0).map((_, i) => 97 + i),
            45 // Dash
        ];

        return allowedChars.includes(charCode);
    }
}
