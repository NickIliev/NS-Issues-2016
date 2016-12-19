import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import * as fs from "file-system";
import { FileSystemAccess } from "file-system/file-system-access";

export function navigatingTo(args: EventData) {
    let page = <Page>args.object;

    let myRoot = fs.File.fromPath('./test.txt');

    console.log("myRoot: " + myRoot.path);

    // let parent = myRoot.parent;
    // console.log("parent: " + parent.path);
}