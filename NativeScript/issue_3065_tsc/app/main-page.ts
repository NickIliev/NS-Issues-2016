/*
In NativeScript, a file with the same name as an XML file is known as
a code-behind file. The code-behind is a great place to place your view
logic, and to set up your page’s data binding.
*/

import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { HelloWorldModel } from './main-view-model';

let model = new HelloWorldModel();

// Event handler for Page "navigatingTo" event attached in main-page.xml
export function navigatingTo(args: EventData) {
    /*
    This gets a reference this page’s <Page> UI component. You can
    view the API reference of the Page to see what’s available at
    https://docs.nativescript.org/api-reference/classes/_ui_page_.page.html
    */
    let page = <Page>args.object;
    
    let speechRecognizer = SFSpeechRecognizer.alloc();

    let recognitionRequest = new SFSpeechAudioBufferRecognitionRequest();

    let recognitionTask = speechRecognizer.recognitionTask(recognitionRequest, function(result, error) {
            let isFinal = false;

            if (result) {
                model.set('speechText', result.bestTranscription.formattedString);
                isFinal = result ? result.isFinal : false;
            }

            if (error || isFinal) {
                audioEngine.stop();
                inputNode.removeTap(0);

                recognitionRequest = null;
                recognitionTask = null;

                model.set('recordButtonEnabled', true);
            }
    });
    

    page.bindingContext = model;
}