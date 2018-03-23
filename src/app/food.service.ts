import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Product } from './product';
import { Query } from './query';

@Injectable()
export class FoodService {

	searchProducts: Product[];
	cartProducts: Product[];
	query: Query;
	startingBudget: number;
	moneyLeft: number;
	
	searchStream$: any;
	cartStream$: any;
	queryStream$: any;
	moneyStream$: any;

	constructor() { 
		this.searchProducts = [];
		this.cartProducts = [];
		this.startingBudget = 250;
		this.moneyLeft = this.startingBudget;

		this.searchStream$ = new Observable(observer => {
			observer.next(this.searchProducts);
			observer.complete();
		});
		this.cartStream$ = new Observable(observer => {
			observer.next(this.cartProducts);
			observer.complete();
		});
		this.queryStream$ = new Observable(observer => {
			observer.next(this.query);
			observer.complete();
		});
		this.moneyStream$ = new Observable(observer => {
			observer.next(this.moneyLeft);
			observer.complete();
		});
	}
	
	search(queryString: string) {
		let product = new Product();
		this.query = new Query();

		this.query.searchTerms = queryString;
		this.query.pages = 10;
		this.query.currentPage = 1;

		product.asin = "XXXXXXXXXX";
		product.name = "Hefty Trash Bags";
		product.desc = "Large 2-ply 140ct ForceFlex";
		product.price = 7.99;
		product.quantity = 1;
		product.imgUrl = "/assets/images/index.jpg";

		for(let i = 0; i < 10; i++)
			this.searchProducts.push(product);
	}

	add(index: number) {
		this.cartProducts.push(this.searchProducts[index]);
		this.calcBudget();
	}

	remove(index: number) {
		this.cartProducts.splice(index, 1);
		this.calcBudget();
	}

	updateQuantity(index: number, quantity: number) {
		this.cartProducts[index].quantity = quantity;
		this.calcBudget();
	}

	calcBudget() {
		let cartTotal = 0;
		for(let i = 0; i < this.cartProducts.length; i++) {
			cartTotal += this.cartProducts[i].price * this.cartProducts[i].quantity;
		}
		this.moneyLeft = this.startingBudget - cartTotal;
	}
}
