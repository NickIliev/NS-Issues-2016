export class Authentication {
  username: string = "grata" ; // can be any name
  password: string = "";
  loggedIn: boolean = false;
  message:  string = "Just started";
  accounts: any;

  constructor(){
    this.accounts = {grata: "grata16"}; // password
  }

  login(){
    if(this.password===this.accounts[this.username]){
      this.message = "Welcome " + this.username;
      this.loggedIn = true;
      return true;
    }

    this.message = "Invalid username or password. Use your GRATA account, please! ";
    return false;
  }

  logout() {
    this.message = "You are logged out";
    this.loggedIn = false;
    this.password = "";
  }
}
