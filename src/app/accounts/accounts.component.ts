import { Component, OnInit } from '@angular/core'
import { Account } from '../account'
import { AccountService } from '../account.service'

@Component({
	selector: 'app-accounts',
	templateUrl: './accounts.component.html',
	styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {

	static title: string = 'Accounts'

	accounts: Account[]

	constructor(private accountService: AccountService) { }

	ngOnInit() {
	}

	getAccounts(): void {
		this.accountService.getAccounts().subscribe((accounts) => this.accounts = accounts)
	}

}

export const thisComponent = AccountsComponent