import { LoginPage } from './../pages/login/login';
import { ChatPage } from './../pages/chat/chat';
import { CustomerServiceProvider } from './../providers/customer-service/customer-service';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;
  data: any;
  pages: Array<{ title: string, component: any, icon: string, showDetails: boolean }>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public service: CustomerServiceProvider) {
    this.initializeApp();
    service.listCategories().subscribe(data => {
      this.data = data;
    }, error => {
      console.log(error);
    });
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Trang chủ', component: HomePage, icon: 'ios-add-circle-outline', showDetails: false },
      { title: 'Loại game', component: ListPage, icon: 'ios-add-circle-outline', showDetails: false },
      { title: 'Tư vấn trực tuyến', component: ChatPage, icon: 'ios-add-circle-outline', showDetails: false }
    ];

  }
  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
  toggleDetails(pages) {
    if (pages.showDetails) {
      pages.showDetails = false;
      pages.icon = 'ios-add-circle-outline';
    } else {
      pages.showDetails = true;
      pages.icon = 'ios-remove-circle-outline';
    }
  }
}
