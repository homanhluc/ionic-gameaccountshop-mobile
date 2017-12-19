import { CustomerServiceProvider } from './../../providers/customer-service/customer-service';
import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { ViewController, AlertController, ToastController } from 'ionic-angular';

@Component({
  selector: 'page-buy',
  templateUrl: 'buy.html',
})
export class BuyPage {
  product: any;
  surplus: number = 1000000;
  order = {
    name: '',
    phone: '',
    address: '',
    note: ''
  };
  user = {
    name: 'Nguyễn Văn B',
    email: 'vanb@gmail.com',
  };

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public service: CustomerServiceProvider,
    public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BuyPage');
    this.product = this.navParams.get('product');
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }

  showPrompt(nameItem) {
    console.log(nameItem);
    var values: string;
    switch (nameItem) {
      case 'name': values = this.order.name; break;
      case 'address': values = this.order.address; break;
      case 'note': values = this.order.note; break;
      case 'phone': values = this.order.phone; break;
      default:
        break;
    }
    let prompt = this.alertCtrl.create({
      title: 'Tên đơn hàng',
      message: "Không được bỏ trống",
      inputs: [
        {
          name: nameItem,
          value: values
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {

          }
        },
        {
          text: 'Save',
          handler: data => {

            switch (nameItem) {
              case 'name': this.order.name = data.name; break;
              case 'phone': this.order.phone = data.phone; break;
              case 'address': this.order.address = data.address; break;
              case 'note': this.order.note = data.note; break;
              default:
                break;
            }
          }
        }
      ]
    });
    prompt.present();
  }
  buy() {
    if (this.order.name === '' || this.order.phone === '' || this.order.address === '' || this.order.note === '') {
      let toast = this.toastCtrl.create({
        message: 'Thông tin nhập thiếu!',
        duration: 1500,
        position: 'top'
      });
      toast.present(toast);
    } else {
      var dataBuy = {
        name: this.order.name,
        phone: this.order.phone,
        address: this.order.address,
        note: this.order.note,
        items: [{
          productId: this.product.id,
          productName: this.product.name,
          quantity: 1,
          productImage: this.product.image,
          productPrice: this.product.price
        }],
        user: {
          email: this.user.email
        }
      }
      this.buyService(dataBuy);
    }
  }
  buyService(data) {
    let loader = this.loadingCtrl.create({
      content: "Đang mua...",
    });
    loader.present();
    this.service.buyProduct(data).subscribe((data) => {
      loader.dismiss();
      let prompt = this.alertCtrl.create({
        title: 'Thông báo',
        message: "Bạn đã mua hàng thành công!",
        buttons: [
          {
            text: 'OK',
            handler: data => {
              this.dismiss();
            }
          }
        ]
      });
      prompt.present();
    }, (error) => {
      console.log(error);
    });
  }
}
