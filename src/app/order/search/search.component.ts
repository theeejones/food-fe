import { Component, OnInit, Input } from '@angular/core';
import { FoodService } from '../../food.service';
import { Product } from "../../product";
import { Query } from "./query";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

	@Input() search_products: Product[];
	@Input() cart_products: Product[];
	query: Query;

	constructor(private _foodService: FoodService) {
		this.query = new Query();
	}

	ngOnInit() {
	}

}
