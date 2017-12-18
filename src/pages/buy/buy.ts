import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular/navigation/view-controller';

@Component({
  selector: 'page-buy',
  templateUrl: 'buy.html',
})
export class BuyPage {
  product: any;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController) {
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
    this.product = this.navParams.get('product');
    console.log(this.product);
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
  
}
