import { UserService } from './../../providers/customer-service/user-service';
import { HomePage } from './../home/home';
import { AuthProvider } from './../../providers/auth/auth';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public user: any;
  usercreds = {
      email: '',
      password: ''
  };
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public authProvider: AuthProvider,
  public userService:UserService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  login(user) {
    console.log(user);
    this.userService.setUserName(user.email);
    this.navCtrl.setRoot(HomePage);
  }

}
