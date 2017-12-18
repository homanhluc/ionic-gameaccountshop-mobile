import { Injectable, } from '@angular/core';
// import { Observable } from 'rxjs/Observable';
import { Http, Headers, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {
  static get parameters() {
    return [Http];
  }
  isLoggedin: boolean;
  AuthToken: string;
  private baseUrl = 'http://localhost:8080';
  private headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
  private options = new RequestOptions({ headers: this.headers });
  
  constructor(public http: Http) {
    this.http = http;
    this.isLoggedin = false;
    this.AuthToken = null;
  }
  storeUserCredentials(token) {
    window.localStorage.setItem('raja', token);
    this.useCredentials(token);
  }
  useCredentials(token) {
    this.isLoggedin = true;
    this.AuthToken = token;
  }

  loadUserCredentials() {
    var token = window.localStorage.getItem('raja');
    this.useCredentials(token);
  }

  destroyUserCredentials() {
    this.isLoggedin = false;
    this.AuthToken = null;
    window.localStorage.clear();
  }

  login(user) {
    var creds = '/login?email='+user.email+"&password="+user.password;
    return new Promise(resolve => {
      this.http.post(this.baseUrl + creds, this.options)
        .subscribe(data => {
          console.log("data:"+data);
          if (data.json().error !== 'Unauthorized'){
            this.storeUserCredentials(data.json().token);
            resolve(true);
          }
          else
            resolve(false);
        });
    });
  }
}
