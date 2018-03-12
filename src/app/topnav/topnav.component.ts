import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';
import { User } from "../user";

@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.css']
})
export class TopnavComponent implements OnInit {

	currentUser: User;

	constructor(private _loginService: LoginService) {
		this.currentUser = _loginService.getCurrentUser();
	}

	ngOnInit() {
	}

	logout() {
		this._loginService.logout();
	}

}
