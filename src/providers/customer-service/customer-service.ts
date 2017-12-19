import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, RequestOptions, Headers, Response } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class CustomerServiceProvider {

  private baseUrl = '/api';
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(public http: Http) { }
  // Danh sach loai game
  listCategories() {
    return this.http.get(this.baseUrl + '/v1/categories', this.options)
      .map((res: Response) => res.json())
      .catch(this.errorHandler);
  }
  // Danh sach cac san san da duoc khach hang dat
  listOrderProducts() {
    return this.http.get(this.baseUrl + '/admin/newestOrders?page=0', this.options)
      .map((res: Response) => res.json())
      .catch(this.errorHandler);
  }
  // Danh sach cac san pham thuoc loai game
  listProductInCategories(id) {
    return this.http.get(this.baseUrl + '/v1/category/' + id + '/products', this.options)
      .map((res: Response) => res.json())
      .catch(this.errorHandler);
  }
  // Danh sach tat ca san pham
  listProducts(page: number): Observable<Object> {
    return this.http.get(this.baseUrl + '/v1/product/latest?page=' + page, this.options)
      .map((res: Response) => res.json())
      .catch(this.errorHandler);
  }
  // Tim kiem san pham
  searchProduct(keyword) {
    return this.http.get(this.baseUrl + '/product/search?keyword=' + keyword, this.options)
      .map((res: Response) => res.json())
      .catch(this.errorHandler);
  }
  // Xem chi tiet san pham
  detailProduct(id: number) {
    return this.http.get(this.baseUrl + '/product/' + id, this.options)
      .map((res: Response) => res.json())
      .catch(this.errorHandler);
  }
  buyProduct(data) {
    return this.http.post(this.baseUrl + '/v1/order/save', JSON.stringify(data), this.options)
      .map((res: Response) => res.json())
      .catch(this.errorHandler);
  }
  // Get anh
  getImage(name): string {
    return this.baseUrl + '/admin/product/' + 'image?name=' + name;
  }
  errorHandler(error: Response) {
    return Observable.throw(error || 'SERVER ERROR');
  }
}
