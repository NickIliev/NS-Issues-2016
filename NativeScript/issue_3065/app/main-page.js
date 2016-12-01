function onNavigatingTo(args) {

    var page = args.object;

    page.bindingContext = createViewModel();

    let speechRecognizer = new SFSpeechRecognizer();

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
    
}

exports.onNavigatingTo = onNavigatingTo;