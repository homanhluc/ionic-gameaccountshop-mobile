import { DetailPage } from './../detail/detail';
import { IProduct } from './../../model/product';
import { CustomerServiceProvider } from './../../providers/customer-service/customer-service';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  dataOrders: any;
  dataProducts: IProduct[];
  private page = 0;
  constructor(public navCtrl: NavController, public service: CustomerServiceProvider) {

  }
  ionViewDidLoad() {
    this.loadNewOrder();
    this.loadProducts();
  }
  detailProduct(id) {
    this.navCtrl.push(DetailPage, {
      paramID: id
    });
  }
  buyProduct(id) {

  }
  doInfinite(infiniteScroll) {
    this.page++;
    setTimeout(() => {
      this.service.listProducts(this.page).subscribe((data) => {
        for (let i = 0; i < data.length; i++) {
          this.dataProducts.push( data[i] );
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
      this.dataOrders = data;
    }, error => {
      console.log(error);
    });
  }
  loadProducts() {
    this.service.listProducts(this.page).subscribe((data) => {
      this.dataProducts = data;
      console.log(data);
    }, (error) => {
      console.log(error);
      // , () => {
      //   this.dataProducts.forEach((element) => {
      //     element.image = element.image === null ? '' : this.service.getImage((element.image));
      //   });
      // }
    });
  }
}
