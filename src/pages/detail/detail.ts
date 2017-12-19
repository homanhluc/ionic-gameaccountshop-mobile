import { BuyPage } from './../buy/buy';
import { IProduct } from './../../model/product';
import { CustomerServiceProvider } from './../../providers/customer-service/customer-service';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { trigger, state, animate, style, transition } from '@angular/animations';
import { ModalController, LoadingController } from 'ionic-angular';

@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
  animations: [
    trigger("showInfo", [
      state("true", style({
        //"opacity": 1,
        'display': 'block'
      })),
      state("false", style({
        //"opacity": 0,
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
  categoryId: number;
  showhideinfo: boolean = true;
  check: boolean = true;
  listImage: any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public service: CustomerServiceProvider,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController) {
    this.paramID = navParams.get('paramID');
  }

  ionViewDidLoad() {
    this.loadDetail();
  }
  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Đang tải...",
    });
    loader.present();
    // load data involve with id of catagory
    this.service.listProductInCategories(this.categoryId).subscribe(data => {
      this.dataInvolve = data.filter(a => {
        return a.id !== this.paramID;
      });
      loader.dismiss();
    });
  }
  presentLoadingImage(images) {
    var image: string = images;
    this.listImage = image.split('; ');
    console.log(this.listImage);
  }
  // Animation show hide
  infoDetail() {
    this.showhideinfo = !this.showhideinfo;
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
  //--------------- START load detail
  loadDetail() {
    let loader = this.loadingCtrl.create({
      content: "Đang tải...",
    });
    loader.present();
    this.service.listCategories().subscribe(id => {
      for (var category of id) {
        console.log(this.check);
        if (!this.check) break;
        this.listProductInCategories(category.id, category);
      }
      loader.dismiss();
    });
  }
  listProductInCategories(id, category) {
    this.service.listProductInCategories(id).subscribe((data) => {
      for (var product of data) {
        if (product.id === this.paramID) {
          this.check = false;
          this.data = product;
          this.category = category.name;
          this.categoryId = category.id;
          this.presentLoadingImage(product.description);
          break;
        }
      }
    });
  }
  //--------------- END load detail

}
