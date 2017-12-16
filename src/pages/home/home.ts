import { IProduct } from './product';
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

  constructor(public navCtrl: NavController, public service: CustomerServiceProvider) {

  }
  ionViewDidLoad() {
    this.loadNewOrder();
    this.loadProducts();
  }
  loadNewOrder() {
    this.service.listOrderProducts().subscribe(data => {
      this.dataOrders = data;
    }, error => {
      console.log(error);
    });
  }
  loadProducts() {
    this.service.listProducts(0).subscribe((data) => {
      this.dataProducts = data;
      console.log(data);
    },
      (error) => {
        console.log(error);
      },
      () => {
        this.dataProducts.forEach((element) => {
          element.image = element.image === null ? '' : this.service.getImage((element.image));
        });
      });
  }
}
