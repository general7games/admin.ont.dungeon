import { Component, OnInit } from '@angular/core'
import { Account } from '../account'
import { AccountService, ListAccountResult } from '../account.service'
import { AccountentryComponent } from '../accountentry/accountentry.component'
import { PagingCursor } from '../types';
import { NGXLogger } from 'ngx-logger';
import { MatDialogRef, MatDialog } from '@angular/material';
import { TransferdialogComponent } from '../transferdialog/transferdialog.component';
import { Observable } from 'rxjs';
import { AccountdetaildialogComponent } from '../accountdetaildialog/accountdetaildialog.component';

@Component({
	selector: 'app-accounts',
	templateUrl: './accounts.component.html',
	styleUrls: ['./accounts.component.css'],
	providers: [NGXLogger]
})
export class AccountsComponent implements OnInit {

	static title: string = 'Accounts'

	error: string = ''
	accounts: Account[]
	cursor: PagingCursor = new PagingCursor()
	searchContent: string = ''

	transferToAccount: (account: Account) => Observable<boolean>
	banAccount: (account: Account) => Account
	showAccountDetails: (account: Account) => void

	constructor(
		private accountService: AccountService,
		private dialog: MatDialog,
		private logger: NGXLogger
	) { }

	ngOnInit() {
		const target = this
		this.transferToAccount = (account: Account) => {
			return target.transferToAccountInternal(account)
		}
		this.banAccount = (account: Account) => {
			return target.banAccountInternal(account)
		}
		this.showAccountDetails = (account: Account) => {
			return target.showAccountDetailsInternal(account)
		}

		this.accountService.getAccounts().subscribe(
			(listAccountResult) => {
				this.updateListAccountResult(listAccountResult)
			})
	}

	transferToAccountInternal(account: Account): Observable<boolean> {
		return new Observable<boolean>((observer) => {
			const dialogRef = this.dialog.open(TransferdialogComponent, {data: account})
			dialogRef.afterClosed().subscribe((result) => {
				observer.next(true)
			})
		})
	}

	banAccountInternal(account: Account) {
		return account
	}

	showAccountDetailsInternal(account: Account) {
		this.dialog.open(AccountdetaildialogComponent, {data: account})
	}

	updateListAccountResult(listAccountResult: ListAccountResult) {
		if (listAccountResult.error) {
			this.error = listAccountResult.error
		}
		this.accounts = listAccountResult.accounts
		this.cursor = listAccountResult.cursor
	}

	onPrev() {
		this.error = ''
		this.accountService.getAccounts(new PagingCursor(this.cursor.before)).subscribe(
			(listAccountResult) => {
				this.updateListAccountResult(listAccountResult)
			})
	}

	onNext() {
		this.error = ''
		this.accountService.getAccounts(new PagingCursor('', this.cursor.after)).subscribe(
			(listAccountResult) => {
				this.updateListAccountResult(listAccountResult)
			})

	}

	onRefreshAccountList() {
		this.error = ''
		this.accountService.getAccounts().subscribe(
			(listAccountResult) => {
				this.updateListAccountResult(listAccountResult)
			}
		)
	}

	getAccountResultDelegate(): (account: Account) => void {
		const target = this
		return function(account: Account) {
			target.accounts.unshift(account)
		}
	}

	onSubmitSearchContent() {
	}

}

export const thisComponent = AccountsComponent
