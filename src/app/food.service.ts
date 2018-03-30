import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Product } from './product';
import { Query } from './query';

@Injectable()
export class FoodService {

	searchProducts: Product[] = [];
	cartProducts: Product[] = [];
	addableProducts: Object[] = [];
	query: Query;
	startingBudget: number;
	moneyLeft: Object;

	searchStream$: Observable<Product[]>;
	cartStream$: Observable<Product[]>;
	addableStream$: Observable<Object[]>;
	queryStream$: Observable<Query>;
	moneyStream$: Observable<Object>;

	constructor() { 
		this.startingBudget = 250;
		this.moneyLeft = { money: this.startingBudget };

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
		this.moneyStream$ = new Observable(observer => {
			observer.next(this.moneyLeft);
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

		for(let i = 0; i < 10; i++) {
			this.searchProducts.push(product);
		}
		
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
		this.moneyLeft = { money: this.startingBudget - cartTotal };
	}

	checkAddable() {
		this.addableProducts = [];
		console.log(this.searchProducts.length);
		for(let i = 0; i < this.searchProducts.length; i++) {
			for(let j = 0; j < this.cartProducts.length; j++) {
				if(this.searchProducts[i].asin == this.cartProducts[j].asin) {
					this.addableProducts.push({ addable: true });
					break;
				}
			}
			this.addableProducts.push({ addable: false });
		}
		console.log(this.addableProducts);
	}
}
