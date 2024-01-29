import { NgModule } from '@angular/core';
import { KeypressNumberOnlyDirective } from './keypress-number-only.directive';
import { KeypressOneSpaceDirective } from './keypress-one-space.directive';
import { KeypressWithoutSpacesDirective } from './keypress-without-space.directive';
import { KeypressNumberLetterDashDirective } from './keypress-number-letter-dash.directive';

const imports = [
    KeypressNumberOnlyDirective,
    KeypressOneSpaceDirective,
    KeypressWithoutSpacesDirective,
    KeypressNumberLetterDashDirective,
];

@NgModule({
    imports: [

    ],
    declarations: [
        ...imports
    ],
    exports: [
        ...imports
    ],
    providers: [
    ]
})
export class UtilDirectivesModule { }
