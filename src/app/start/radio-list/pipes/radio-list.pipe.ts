import { Pipe, PipeTransform } from "@angular/core";
import { RadioListModel } from "../radio-list.model";

@Pipe({ name: 'onlyAllowedRadio', pure: false })
export class RadioListAllowedPipe implements PipeTransform {

    transform(value: RadioListModel[]): RadioListModel[] {
        if (!value.length) { return []; }

        return value.filter((item: RadioListModel) => item.isAllowed);
    }
}
