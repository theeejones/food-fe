import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OrderComponent } from '../order.component';
import { FoodService } from '../../food.service';
import { Product } from "../../product";
import { User } from "../../user";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

	searchProducts: Product[];
	cartProducts: Product[];
	moneyLeft: Object;

	constructor(private _foodService: FoodService, private _cd: ChangeDetectorRef) {
	}

	ngOnInit() {
		this._foodService.searchStream$.subscribe(searchProducts => {
			this.searchProducts = searchProducts;
		});
		this._foodService.cartStream$.subscribe(cartProducts => {
			this.cartProducts = cartProducts;
		});
		// This doesn't work. ???
		this._foodService.moneyStream$.subscribe(moneyLeft => {
		 	this.moneyLeft = moneyLeft;
		 });
	}

	ngOnDestroy() {
		// this._foodService.searchStream$.unsubscribe();
		// this._foodService.cartStream$.unsubscribe();
		// this._foodService.moneyStream$.unsubscribe();
	}

	remove(index: number) {
		this._foodService.remove(index);
	}

	updateQuantity(index: number) {
		this._foodService.updateQuantity(index, this.cartProducts[index].quantity);
	}
}
