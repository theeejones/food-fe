import { Injectable } from '@angular/core';
import { Product } from './product';
import { Query } from './query';

@Injectable()
export class FoodService {

	constructor() { }

	search(callback) {
		let product = new Product();
		let products = [];
		let query = new Query();

		query.pages = 10;
		query.currentPage = 1;

		product.asin = "XXXXXXXXXX";
		product.name = "Hefty Trash Bags";
		product.desc = "Large 2-ply 140ct ForceFlex";
		product.quantity = 1;
		product.imgUrl = "/assets/images/index.jpg";

		for(let i = 0; i < 11; i++)
			products.push(product);

		callback(query, products);
	}

}
