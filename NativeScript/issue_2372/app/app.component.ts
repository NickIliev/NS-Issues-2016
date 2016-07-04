import {Component} from "@angular/core";

@Component({
    selector: "my-app",
    template: `
<ActionBar title="test">
  <StackLayout orientation="horizontal"
    ios:horizontalAlignment="center"
    android:horizontalAlignment="left">
    <Image src="res://nativescript_logo" class="action-image"></Image>
    <Label text="NativeScript"  class="action-label"></Label>
  </StackLayout>
</ActionBar>

<StackLayout>
    <Label text="Tap the button" class="title"></Label>
    
    <Button text="TAP" (tap)="onTap()"></Button>

    <Label [text]="message" class="message" textWrap="true"></Label>
</StackLayout>
`,
})
export class AppComponent {
    public counter: number = 16;

    public get message(): string {
        if (this.counter > 0) {
            return this.counter + " taps left";
        } else {
            return "Hoorraaay! \nYou are ready to start building!";
        }
    }
    
    public onTap() {
        this.counter--;
    }
}
