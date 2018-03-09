import { Component, OnInit } from '@angular/core';
import { FoodService } from '../food.service';
import { User } from '../user';
import { Product } from '../product';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})

export class OrderComponent implements OnInit {

	search_products: Product[];
	cart_products: Product[];

	constructor() {
		this.search_products = [];
		this.cart_products = [];
	}

	ngOnInit() {
	}

}
