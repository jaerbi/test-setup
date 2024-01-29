import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-image',
    templateUrl: './image.component.html',
})
export class ImageComponent {

    @Input() imgClass: string | undefined;
    @Input() imgUrl: string | undefined;
    @Input() imgAlt: string | undefined;

}
