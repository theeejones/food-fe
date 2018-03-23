import { Component, OnInit, OnDestroy } from '@angular/core';
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
	moneyLeft: number;

	constructor(private _foodService: FoodService) {
		
	}

	ngOnInit() {
		this._foodService.searchStream$.subscribe(searchProducts => {
			this.searchProducts = searchProducts;
		});
		this._foodService.cartStream$.subscribe(cartProducts => {
			this.cartProducts = cartProducts;
		});
		this._foodService.moneyStream$.subscribe(moneyLeft => {
			this.moneyLeft = moneyLeft;
		});
	}

	ngOnDestroy() {
		this._foodService.searchStream$.unsubscribe();
		this._foodService.cartStream$.unsubscribe();
		this._foodService.moneyStream$.unsubscribe();
	}

	remove(index: number) {
		this._foodService.remove(index);
	}

	updateQuantity(index: number) {
		console.log(index);
		this._foodService.updateQuantity(index, this.cartProducts[index].quantity);
	}
}
