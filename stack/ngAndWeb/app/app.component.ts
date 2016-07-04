import {Component} from "@angular/core";

@Component({
    selector: "my-app",
    template: `
<StackLayout>
    <Label [text]="title" class="title"></Label>
    <Label [text]="hero" class="message" textWrap="true"></Label>
</StackLayout>
`,
})

export class AppComponent {
  title = 'Dota 2 Heroes';
  hero = 'Spritbreaker';
}
