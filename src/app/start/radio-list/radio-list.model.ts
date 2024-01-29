export class RadioListModel {
    constructor(
        public label: string,
        public value: any,
        public description?: string,
        public badgeTitle?: number,
        public isMore: boolean = false,
        public isAllowed: boolean = true,
    ) { }
}
