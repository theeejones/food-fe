import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';

import { FoodService } from './food.service';
import { LoginService } from './login/login.service';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { OrderComponent } from './order/order.component';
import { SearchComponent } from './order/search/search.component';
import { CartComponent } from './order/cart/cart.component';
import { LoginComponent } from './login/login.component';
import { TopnavComponent } from './topnav/topnav.component';


@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    OrderComponent,
    SearchComponent,
    CartComponent,
    LoginComponent,
    TopnavComponent
  ],
  imports: [
    BrowserModule,
	AppRoutingModule,
	FormsModule,
	HttpModule
  ],
  providers: [
	  FoodService,
	  LoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
