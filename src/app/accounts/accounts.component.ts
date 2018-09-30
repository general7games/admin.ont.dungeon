import { Component, OnInit } from '@angular/core'
import { Account } from '../account'
import { AccountService, ListAccountResult, SearchType } from '../account.service'
import { AccountentryComponent } from '../accountentry/accountentry.component'
import { PagingCursor } from '../types';
import { NGXLogger } from 'ngx-logger';
import { MatDialogRef, MatDialog } from '@angular/material';
import { TransferdialogComponent } from '../transferdialog/transferdialog.component';
import { Observable } from 'rxjs';
import { AccountdetaildialogComponent } from '../accountdetaildialog/accountdetaildialog.component';
import * as utils from '../utils'

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
	prevSearchContent: string = ''

	showAccountDetails: (account: Account) => void

	constructor(
		private accountService: AccountService,
		private dialog: MatDialog,
		private logger: NGXLogger
	) { }

	ngOnInit() {
		const target = this
		this.showAccountDetails = (account: Account) => {
			return target.showAccountDetailsInternal(account)
		}


		this.accountService.list().subscribe(
			(listAccountResult) => {
				this.updateListAccountResult(listAccountResult)
			})
	}

	showAccountDetailsInternal(account: Account) {
		const target = this
		this.dialog.open(
			AccountdetaildialogComponent,
			{
				data: {
					account,
					onRootAccountChanged: (fromAddress) => {
						// find in accounts
						const account = target.accounts.find((a) => a.address == fromAddress)
						if (account) {
							account.role = ''
						}
					}
				},
				autoFocus: false
			})
	}

	updateListAccountResult(listAccountResult: ListAccountResult) {
		if (listAccountResult.error) {
			this.error = listAccountResult.error
		}
		this.accounts = listAccountResult.accounts
		if (this.accounts.length === 0) {
			this.error = 'not found'
		}
		this.cursor = listAccountResult.cursor
	}

	onPrev() {
		this.error = ''
		this.accountService.list(new PagingCursor(this.cursor.before)).subscribe(
			(listAccountResult) => {
				this.updateListAccountResult(listAccountResult)
			})
	}

	onNext() {
		this.error = ''
		this.accountService.list(new PagingCursor('', this.cursor.after)).subscribe(
			(listAccountResult) => {
				this.updateListAccountResult(listAccountResult)
			})

	}

	onRefreshAccountList() {
		this.error = ''
		this.prevSearchContent = this.searchContent
		this.searchContent = ''
		this.accountService.list().subscribe(
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
		if (this.prevSearchContent === this.searchContent) {
			return
		}
		if (this.searchContent.length === 0) {
			this.onRefreshAccountList()
			return
		}
		this.error = ''
		this.prevSearchContent = this.searchContent
		let type: SearchType
		try {
			utils.base58ToHex(this.searchContent)
			type = 'address'
		} catch (e) {
			type = 'label'
		}
		this.accountService
			.search({content: this.searchContent, type})
			.subscribe((result) => {
				this.updateListAccountResult(result)
			})
	}

}

export const thisComponent = AccountsComponent
