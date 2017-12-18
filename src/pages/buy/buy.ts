import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-buy',
  templateUrl: 'buy.html',
})
export class BuyPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  dataBuy = {
    "name" : "Order test",
    "phone": "0966879086",
    "address" : "BD",
    "note": "NO",
    "items": [{
          "productId": 21,
          "productName": "Account 5",
          "quantity": 2,
          "productImage": "ssss.jpg",
          "productPrice": 110000
      }],
    "user" :{
          "email": "tien@gmail.com"
      }
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad BuyPage');
  }

}
