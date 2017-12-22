import { UserService } from './../../providers/customer-service/user-service';
import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { Socket } from 'ng-socket-io';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  nickname = '';
  messages = [];
  message = '';
  typing: any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private socket: Socket,
    private toastCtrl: ToastController,
    private userService: UserService) {
    //this.nickname = this.navParams.get('nickname');
    this.socket.connect();
    this.socket.emit('user-online', this.nickname = this.userService.getUserName());
    this.getMessages().subscribe(message => {
      this.messages.push(message);
      console.log(message);
    });

    this.listenAdminTypingMessage().subscribe(message => {
      this.typing = message;
      console.log(this.typing);
    });
  }

  ionViewDidLoad() {

  }
  typingMessageOn() {
    this.socket.emit('user-typing-message-on',this.nickname);
  }
  typingMessageOff() {
    this.socket.emit('user-typing-message-off',this.nickname);
  }
  listenAdminTypingMessage() {
    let observable = new Observable(observer => {
      this.socket.on('admin-typing-message-on', (data) => {
        observer.next(data);
      });
      this.socket.on('admin-typing-message-off', (data) => {
        observer.next(data);
      });
    })
    return observable;
  }
  sendMessage() {
    this.socket.emit('user-add-message', {
      text: this.message
    });
    this.message = '';  
  }
  makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
  }
  getMessages() {
    let observable = new Observable(observer => {
      this.socket.on('message-user', (data) => {
        console.log(data);
        observer.next(data);
      });
      this.socket.on('message-admin', (data) => {
        console.log(data);
        observer.next(data);
      });
    })
    return observable;
  }

  ionViewWillLeave() {
    this.socket.disconnect();
  }

  showToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
}
