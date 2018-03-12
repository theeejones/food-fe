import { Component, OnInit, Input } from '@angular/core';
import { FoodService } from '../../food.service';
import { Product } from "../../product";
import { Query } from "../../query";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

	@Input() searchProducts: Product[];
	@Input() cartProducts: Product[];
	query: Query;

	constructor(private _foodService: FoodService) {
		this.query = new Query();
	}

	ngOnInit() {
	}

	search() {
		this._foodService.search(
			(query, searchProducts) => {
				this.query = query;
				this.searchProducts = searchProducts;
			}
		);
	}

	add(index) {
		
	}

}
