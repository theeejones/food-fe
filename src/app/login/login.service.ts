import { Injectable } from '@angular/core';
import { User } from '../user';

@Injectable()
export class LoginService {

	currentUser: User;

	constructor() { }

	login(user: User) {

	}

	logout() {

	}

	getCurrentUser() {
		return this.currentUser;
	}
}
