import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { Account } from './account'
import axios from 'axios'
import { getURL } from './utils'
import { environment } from '../environments/environment'

import { Accounts } from './mock-accounts'

@Injectable({
	providedIn: 'root'
})
export class AccountService {

	constructor() { }

	getAccounts(): Observable<Account[]> {
		const accounts: Account[] = new Array<Account>()
		return of(accounts)
	}
}
