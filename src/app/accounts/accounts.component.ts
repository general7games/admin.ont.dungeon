import { Component, OnInit } from '@angular/core'
import { Account } from '../account'
import { AccountService } from '../account.service'
import { AccountentryComponent } from '../accountentry/accountentry.component'
import { PagingCursor } from '../types';
import { NGXLogger } from 'ngx-logger';

@Component({
	selector: 'app-accounts',
	templateUrl: './accounts.component.html',
	styleUrls: ['./accounts.component.css'],
	providers: [NGXLogger]
})
export class AccountsComponent implements OnInit {

	static title: string = 'Accounts'

	accounts: Account[]
	cursor: PagingCursor = new PagingCursor()

	constructor(
		private accountService: AccountService,
		private logger: NGXLogger
	) { }

	ngOnInit() {
		this.accountService.getAccounts().subscribe(
			(listAccountResult) => {
				this.updateListAccountResult(listAccountResult)
			})
	}

	updateListAccountResult(listAccountResult) {
		this.accounts = listAccountResult.accounts
		this.cursor = listAccountResult.cursor
	}

	onPrev() {
		this.accountService.getAccounts(new PagingCursor(this.cursor.before)).subscribe(
			(listAccountResult) => {
				this.updateListAccountResult(listAccountResult)
			})
	}

	onNext() {
		this.accountService.getAccounts(new PagingCursor('', this.cursor.after)).subscribe(
			(listAccountResult) => {
				this.updateListAccountResult(listAccountResult)
			})

	}


	getAccountResultDelegate(): (account: Account) => void {
		const target = this
		return function(account: Account) {
			target.accounts.unshift(account)
		}
	}


}

export const thisComponent = AccountsComponent
