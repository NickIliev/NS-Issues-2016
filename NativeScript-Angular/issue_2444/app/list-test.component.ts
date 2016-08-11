import {Component, Input, ChangeDetectionStrategy} from '@angular/core';

class DataItem {
    constructor(public id: number, public name: string) { }
}

@Component({
    selector: 'list-test',
    styleUrls: ['list-test.css'],
    template: 'list-test.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListTest {
    public myItems: Array<DataItem>;
    private counter: number;

    constructor() {
        this.myItems = [];
        this.counter = 0;
        for (var i = 0; i < 50; i++) {
            this.myItems.push(new DataItem(i, "data item " + i));
            this.counter = i;
        }
    }

    public onItemTap(args) {
        console.log("------------------------ ItemTapped: " + args.index);
    }
}