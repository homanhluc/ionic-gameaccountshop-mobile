import { Injectable } from '@angular/core';
 
@Injectable()
export class UserService {
     
    email: string;
 
    constructor() {
        this.email = '';
    }
  
    setUserName(email) {
        this.email = email;     
    }
  
    getUserName() {
        return this.email;
    }  
}