import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Product } from './product';
import { Query } from './query';
import { Addableproduct } from './addableproduct';

@Injectable()
export class FoodService {

	searchProducts: Product[] = [];
	cartProducts: Product[] = [];
	addableProducts: Addableproduct[] = [];
	query: Query;
	startingBudget: number;
	moneyLeft: number;

	searchStream$: Observable<Product[]>;
	cartStream$: Observable<Product[]>;
	addableStream$: Observable<Addableproduct[]>;
	queryStream$: Observable<Query>;
	
	// Observable doesn't work ???
	//moneyStream$: Observable<number>;

	constructor() { 
		this.startingBudget = 250;
		this.moneyLeft = this.startingBudget;

		this.searchStream$ = new Observable(observer => {
			observer.next(this.searchProducts);
		});
		this.cartStream$ = new Observable(observer => {
			observer.next(this.cartProducts);
		});
		this.addableStream$ = new Observable(observer => {
			observer.next(this.addableProducts);
		});
		this.queryStream$ = new Observable(observer => {
			observer.next(this.query);
		});
		
		// This doesn't work. ???
		// this.moneyStream$ = new Observable(observer => {
		// 	observer.next(this.moneyLeft);
		// });
	}
	
	search(queryString: string, callback) {
		this.query = new Query();
		this.searchProducts  = [];

		for(let i = 0; i < 10; i++){
			let product = new Product();

			this.query.searchTerms = queryString;
			this.query.pages = 10;
			this.query.currentPage = 1;

			product.asin = "XXXXXXXXXX" + i;
			product.name = "Hefty Trash Bags";
			product.desc = "Large 2-ply 140ct ForceFlex";
			product.price = 7.99;
			product.quantity = 1;
			product.imgUrl = "/assets/images/index.jpg";

			this.searchProducts.push(product);
		}

		callback(this.searchProducts);
		this.checkAddable();
	}

	add(index: number) {
		this.cartProducts.push(this.searchProducts[index]);
		this.checkAddable();
		this.calcBudget();
	}

	remove(index: number) {
		this.cartProducts.splice(index, 1);
		this.checkAddable();
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
		this.moneyLeft = Number((this.startingBudget - cartTotal).toFixed(2));
		if(this.moneyLeft < 0){
			for(let i = 0; i < this.addableProducts.length; i++){
				this.addableProducts[i].notAddable = true;
			}
		}
	}

	checkAddable() {
		this.addableProducts = [];
		for(let i = 0; i < this.searchProducts.length; i++) {
			for(var j = 0; j < this.cartProducts.length; j++) {
				if(this.searchProducts[i].asin == this.cartProducts[j].asin) {
					this.addableProducts.push({ notAddable: true });
					break;
				}
			}
			if(j == this.cartProducts.length){
				this.addableProducts.push({ notAddable: false });
			}
		}
	}
}
