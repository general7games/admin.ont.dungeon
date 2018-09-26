import { Component, OnInit, Input } from '@angular/core';
import { AccountService, AccountResult, AccountInfo } from '../account.service'
import { Observable } from 'rxjs'

interface AccountDat {
	address: string
	key: string
	salt: string
	parameters: {
		curve: string
	},
	label: string,

	// update by operation
	shouldImport?: boolean
	password?: string
}

interface WalletDat {
	scrypt: {
		p: number,
		n: number,
		r: number,
		dkLen: number
	}
	accounts: AccountDat[]
}

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

	isImporting: boolean
	error: string
	showResultMessage: boolean

	wallet: WalletDat
	walletAccounts: AccountDat[]

	constructor(private accountService: AccountService) { }

	ngOnInit() {

	}

	@Input()
	accountResultDelegate: (account: Account) => void

	updateAccountResult(accountResult: AccountResult) {
		this.showResultMessage = true
		setTimeout(() => {
			this.showResultMessage = false
		}, 3000)
		if (accountResult.error) {
			this.error = accountResult.error
		} else {
			if (this.accountResultDelegate) {
				this.accountResultDelegate.apply(this, [accountResult.account])
			}
			// cleanup form
			this.importAccount.label = ''
			this.importAccount.password = ''
			this.importAccount.rePassword = ''
			this.importAccount.mnemonic = ''
			this.importAccount.wif = ''
		}
	}

	onWalletDatSelected(files) {
		const walletFile = files[0]
		const reader = new FileReader()
		reader.addEventListener('loadend', (ev) => {
			this.wallet = JSON.parse(reader.result) as WalletDat
			this.walletAccounts = this.wallet.accounts
		})
		reader.readAsText(walletFile)
	}


	onSubmitWithMnemonic() {
		this.isImporting = true
		this.error = ''
		if (this.importAccount.password === this.importAccount.rePassword) {
			this.accountService.importByMnemonic(
				this.importAccount.label,
				this.importAccount.mnemonic,
				this.importAccount.password
			).subscribe((accountResult) => {
				this.updateAccountResult(accountResult)
				this.isImporting = false
			})
		} else {
			this.error = 'password not the same'
			this.isImporting = false
		}
	}

	onSubmitWithWIF() {
		this.isImporting = true
		this.error = ''
		if (this.importAccount.password === this.importAccount.rePassword) {
			this.accountService.importByWIF(
				this.importAccount.label,
				this.importAccount.wif,
				this.importAccount.password
			).subscribe((accountResult) => {
				this.updateAccountResult(accountResult)
				this.isImporting = false
			})
		} else {
			this.error = 'password not the same'
			this.isImporting = false
		}
	}

	onSubmitToCreate() {
		this.isImporting = true
		this.error = ''
		if (this.importAccount.password === this.importAccount.rePassword) {
			this.accountService.createAccount(
				this.importAccount.label,
				this.importAccount.password
			).subscribe((accountResult) => {
				this.updateAccountResult(accountResult)
				this.isImporting = false
			})
		} else {
			this.error = 'password not the same'
			this.isImporting = false
		}
	}

	hasAddrToImport() {
		if (this.walletAccounts) {
			let addrCount = 0
			this.walletAccounts.forEach((x) => {
				if (x.shouldImport) {
					addrCount = addrCount + 1
				}
			})
			return addrCount > 0
		} else {
			return false
		}
	}

	onSubmitToRestore() {
		/*
		info: {
			label: string,
			address: string,
			key: string,
			salt: string,
			password: string,
			parameters?: {
				curve: string
			},
			scrypt?: {
				p: number,
				n: number,
				r: number,
				dkLen: number
			}
		}
		*/

		this.isImporting = true
		this.error = ''
		if (this.walletAccounts) {
			const ps = new Array<Promise<AccountResult>>()
			this.walletAccounts.forEach((a) => {
				const info: AccountInfo = {
					label: a.label,
					address: a.address,
					key: a.key,
					salt: a.salt,
					password: a.password,
					parameters: a.parameters,
					scrypt: this.wallet.scrypt
				}
				const p = new Promise<AccountResult>((resolve, reject) => {
					this.accountService.importByEncryptedPk(
						info
					).subscribe((r) => {
						resolve(r)
					})
				})
				ps.push(p)
			})
			if (ps.length > 0) {
				Promise
					.all(ps)
					.then((results) => {
						this.error = Array
							.from(results, (r) => {
								if (r.error) {
									return r.error
								}
								this.updateAccountResult(r)
								return ''
							})
							.join('<br/>')
						this.isImporting = false
					})
					.catch((err) => {
						this.error = err.message
						this.isImporting = false
					})
			} else {
				this.error = 'nothing to import'
				this.isImporting = false
			}
		} else {
			this.error = ''
			this.isImporting = false
		}

	}

}
