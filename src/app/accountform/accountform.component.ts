import { Component, OnInit, Input } from '@angular/core';
import { AccountService, AccountResult } from '../account.service';

@Component({
	selector: 'app-accountform',
	templateUrl: './accountform.component.html',
	styleUrls: ['./accountform.component.css'],
	providers: [AccountService]
})
export class AccountformComponent implements OnInit {

	importAccount = {
		label: '',
		password: '',
		rePassword: '',
		mnemonic: '',
		wif: ''
	}

	error: string

	constructor(private accountService: AccountService) { }

	ngOnInit() {

	}

	@Input()
	accountResultDelegate: (account: Account) => void

	updateAccountResult(accountResult: AccountResult) {
		if (accountResult.error) {
			this.error = accountResult.error
		} else {
			if (this.accountResultDelegate) {
				this.accountResultDelegate.apply(this, [accountResult.account])
			}
		}
	}


	onSubmitWithMnemonic() {
		this.error = ''
		if (this.importAccount.password === this.importAccount.rePassword) {
			this.accountService.importByMnemonic(
				this.importAccount.label,
				this.importAccount.mnemonic,
				this.importAccount.password
			).subscribe((accountResult) => {
				this.updateAccountResult(accountResult)
			})
		} else {
			this.error = 'password not the same'
		}
	}

	onSubmitWithWIF() {
		this.error = ''
		if (this.importAccount.password === this.importAccount.rePassword) {
			this.accountService.importByWIF(
				this.importAccount.label,
				this.importAccount.wif,
				this.importAccount.password
			).subscribe((accountResult) => {
				this.updateAccountResult(accountResult)
			})
		} else {
			this.error = 'password not the same'
		}
	}

	onSubmitToCreate() {
		this.error = ''
		if (this.importAccount.password === this.importAccount.rePassword) {
			this.accountService.createAccount(
				this.importAccount.label,
				this.importAccount.password
			).subscribe((accountResult) => {
				this.updateAccountResult(accountResult)
			})
		} else {
			this.error = 'password not the same'
		}
	}



}
