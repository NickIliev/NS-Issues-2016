import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { HelloWorldModel } from './main-view-model';

import * as http from "http";

export function navigatingTo(args: EventData) {

  let page = <Page>args.object;
  page.bindingContext = new HelloWorldModel();

  http.request({
    url: "https://httpbin.org/patch",
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    content: JSON.stringify({ MyVariableOne: "ValueOne", MyVariableTwo: "ValueTwo" })
  }).then(response => {
    var result = response.content.toJSON();
    console.log(result);
  });
}

var questionsList20 = {
  "questions": [
    { "question": "Taxing a commodity at the production level decreases supply.", "correctAnswer": "answerOne", "answerOne": "True", "answerTwo": "False", "answerThree": "Uncertain", "answerFour": "None of the above", "userResponse": "", "explanationTwo": "True", "grade": "" },
    { "question": "The circular flow depicts the alternative combination of goods and services an economy \tcan produce at a point in time.", "correctAnswer": "answerTwo", "answerOne": "True", "answerTwo": "False", "answerThree": "Uncertain", "answerFour": "None of the above", "userResponse": "", "explanationTwo": "False", "grade": "" },
    { "question": "Demand is inelastic if elasticity of demand < 0.", "correctAnswer": "answerTwo", "answerOne": "True", "answerTwo": "False", "answerThree": "Uncertain", "answerFour": "None of the above", "userResponse": "", "explanationTwo": "False", "grade": "" },
    { "question": "Elasticity of demand measures the percentage change in the quantity demand of a commodity as a result of a given percentage change in price.", "correctAnswer": "answerTwo", "answerOne": "True", "answerTwo": "False", "answerThree": "Uncertain", "answerFour": "None of the above", "userResponse": "", "explanationTwo": "False", "grade": "" }]
}