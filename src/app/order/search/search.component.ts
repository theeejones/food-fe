import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FoodService } from '../../food.service';
import { Product } from "../../product";
import { Query } from "../../query";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

	searchProducts: Product[];
	cartProducts: Product[];
	query: Query;
	queryString: string;

	constructor(private _foodService: FoodService) {
		this._foodService.searchStream$.subscribe(searchProducts => {
			this.searchProducts = searchProducts;
		});
		this._foodService.cartStream$.subscribe(cartProducts => {
			this.cartProducts = cartProducts;
		});
		this._foodService.queryStream$.subscribe(query => {
			this.query = query;
		});
	}

	ngOnInit() {
	}

	search() {
		this._foodService.search(this.queryString);
	}

	add(index: number) {
		this._foodService.add(index);
	}

}
