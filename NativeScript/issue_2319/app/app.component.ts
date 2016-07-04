import {Component, OnInit} from "@angular/core";

export class Order {
    constructor(public id: number, public status: number) {};

    private colors = ['red', 'orange', 'yellow', 'green', 'gray', 'blue'];

    getBgColor() {
        return this.colors[this.status];
    }
}

@Component({
  selector: "list",
  template: `
    <ListView [items]="orders">
        <template let-item="item">
            <StackLayout orientation="vertical">
                <StackLayout orientation="horizontal" [class]="item.getBgColor()">
                    <Label text="class"></Label>
                    <Label text=""></Label>
                </StackLayout>
                <StackLayout orientation="horizontal" [backgroundColor]="item.getBgColor()">
                    <Label text="backgroundColor"></Label>
                    <Label text=""></Label>
                </StackLayout>
                <Label [text]="item.id"></Label>
                <Label [text]="item.status"></Label>
                <Label [text]="item.getBgColor()"></Label>
            </StackLayout>
        </template>
    </ListView>    
  `,
  styles: [
        '.red { background-color: red; }', 
        '.orange { background-color: orange; }', 
        '.yellow { background-color: yellow; }', 
        '.green { background-color: green; }', 
        '.gray { background-color: gray; }', 
        '.blue { background-color: blue; }'
  ],
})
export class AppComponent implements OnInit {
    orders: Array<Order> = [];

    ngOnInit() {
        let i: number;
        for (i = 0; i < 200; i++) {
            this.orders.push(new Order(i, i % 6));
        }
    }
}