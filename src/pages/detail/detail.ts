import { IProduct } from './../../model/product';
import { CustomerServiceProvider } from './../../providers/customer-service/customer-service';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {trigger,state,animate,style,transition} from '@angular/animations';

@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
  animations: [
    trigger("showInfo", [
        state("true", style({
            "opacity": 1,
            'display': 'block'
        })),
        state("false", style({
            "opacity": 0,
            'display': 'none'
        })),
        transition("true => false", animate("350ms")),
        transition("false => true", animate("350ms"))
    ])
]
})
export class DetailPage {
  paramID: number;
  data: IProduct;
  dataInvolve: IProduct[];
  category: any;
  showhideinfo: boolean = true;
  check: boolean = true;
  constructor(public navCtrl: NavController, public navParams: NavParams, public service: CustomerServiceProvider) {
    this.paramID = navParams.get('paramID');
    //this.paramID = 24;
  }

  ionViewDidLoad() {
    this.loadDetail();
  }
  // Animation show hide
  infoDetail() {
    this.showhideinfo = !this.showhideinfo;
  }
  detailProduct(id) {

  }
  buyProduct(id) {

  }
  //--------------- START load detail
  loadDetail() {
    this.service.listCategories().subscribe(id => {
      for (var category of id) {
        console.log(this.check);
        if (!this.check) break;
        this.listProductInCategories(category.id, category);
      }
    });
  }
  listProductInCategories(id, category) {
    this.service.listProductInCategories(id).subscribe((data) => {
      for (var product of data) {
        if (product.id === this.paramID) {
          this.check = false;
          this.data = product;
          this.category = category.name;
          this.loadDataInvolve(category.id);
          break;
        }
      }
    });
  }
  //--------------- END load detail
  // load data involve with id of catagory
  loadDataInvolve(category) {
    this.service.listProductInCategories(category).subscribe(data => {
      this.dataInvolve = data.filter(a => {
        return a.id !== this.paramID;
      });
    });
  }
}
