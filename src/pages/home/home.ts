import { BuyPage } from './../buy/buy';
import { DetailPage } from './../detail/detail';
import { CustomerServiceProvider } from './../../providers/customer-service/customer-service';
import { Component } from '@angular/core';
import { NavController, ModalController, LoadingController, ToastController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  dataOrders: any;
  dataProducts: any = [];
  idOrder: string[] = [];
  private page = 0;
  nickname = '';
  constructor(public navCtrl: NavController,
    public service: CustomerServiceProvider,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController) {
  }
  ionViewDidLoad() {
    this.loadProducts();
  }
  detailProduct(id) {
    this.navCtrl.push(DetailPage, {
      paramID: id
    });
  }
  buyProduct(product) {
    let modal = this.modalCtrl.create(BuyPage, {
      product: product
    });
    modal.present();
  }
  doInfinite(infiniteScroll) {
    this.page++;
    setTimeout(() => {
      this.service.listProducts(this.page).subscribe((data) => {
        for (let i = 0; i < Object.keys(data).length; i++) {
          if(data.content[i] !== undefined) {
            this.dataProducts.push(data.content[i]);
          }
        }
        if(data.content[0] === undefined) {
          let toast = this.toastCtrl.create({
            message: 'Danh sách trống!',
            duration: 1500,
            position: 'bottom'
          });
          toast.present(toast);
        }
      }, (error) => {
        console.log(error);
      });
      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 1000);
  }
  loadNewOrder() {
    this.service.listOrderProducts().subscribe(data => {
      this.dataOrders = data.content;
      console.log(this.dataOrders);
    }, error => {
      console.log(error);
    });
  }
  loadProducts() {
    let loading = this.loadingCtrl.create({
      content: 'Đang tải...'
    });
    loading.present();
    this.service.listProducts(this.page).subscribe((data) => {
      this.loadNewOrder();
      this.dataProducts = data.content;
      loading.dismiss();
    }, (error) => {
      console.log(error);
      // , () => {
      //   this.dataProducts.forEach((element) => {
      //     element.image = element.image === null ? '' : this.service.getImage((element.image));
      //   });
      // }
    });
  }
  checkId() {
    this.service.checkProductOrdered().subscribe((data) => {
      for (var d of data) {
        this.idOrder.push(d.product.id);
      }

    });
  }
}
