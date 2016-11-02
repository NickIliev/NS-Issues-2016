import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { Label } from 'ui/label';
let st;

export function navigatingTo(args: EventData) {
  let page = <Page>args.object;
  st = page.getViewById("st");
}


export function onStackTouch(args: EventData) {
  console.log("onStackTouch");
}
export function onTap(args: EventData) {
  console.log("onTap");

  console.log(st.isUserInteractionEnabled)
  // st.off("touch");
  var view = <Label>args.object;
  view.text += "ala";
}