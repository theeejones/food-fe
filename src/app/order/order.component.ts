import { Component, OnInit } from '@angular/core';
import { FoodService } from '../food.service';
import { User } from '../user';
import { Product } from '../product';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})

export class OrderComponent implements OnInit {

	

  constructor() { }

  ngOnInit() {
  }

}
