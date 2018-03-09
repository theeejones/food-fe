import { Component, OnInit, Input } from '@angular/core';
import { FoodService } from '../../food.service';
import { Product } from "../../product";
import { User } from "../../user";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

	@Input() search_products: Product[];
	@Input() cart_products: Product[];

	constructor(private _foodService: FoodService) { }

	ngOnInit() {
	}

}
