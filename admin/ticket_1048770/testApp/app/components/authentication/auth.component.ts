//import 'reflect-meta';
import {Inject, Component} from "@angular/core";
import {NgIf} from "@angular/common";

import {Authentication} from "./authModel.component";

@Component({
  selector: 'authenticationView',
  directives: [NgIf],
  template:"./components/authentication/auth.html",
})

export class AuthenticationPage {
  authentication: Authentication; //object

  constructor(){
    this.authentication = new Authentication();
  }

  onLoginTap(form, username, password){
    this.authentication.username = username.toLowerCase();
    this.authentication.password = password.toLowerCase();

    var result = this.authentication.login();

    if(result == false) {
      this.animateFailedAction(form);
    }
  }

  // animation
  animateFailedAction(component) {
    component.animate({
      translate: {x:10, y:0},
      duration: 50,
      iterations:5
    })
    .then (function(){
      component.animate({
        translate:{x:0,  y:0}
      })
    });
  }
}
