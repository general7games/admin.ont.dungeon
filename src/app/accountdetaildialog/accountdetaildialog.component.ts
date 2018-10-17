import { Component, OnInit, Inject } from '@angular/core'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'
import { AssetService } from '../asset.service'
import { Account } from '../account'
import { TransferdialogComponent } from '../transferdialog/transferdialog.component';
import { AccountService } from '../account.service';

export interface AccountDetail {
	account: Account
	onRootAccountChanged: (fromAddress: string) => void
}

@Component({
	selector: 'app-accountdetaildialog',
	templateUrl: './accountdetaildialog.component.html',
	styleUrls: ['./accountdetaildialog.component.css'],
	providers: [AssetService]
})
export class AccountdetaildialogComponent implements OnInit {

	balance = {
		ONT: '0',
		ONG: '0'
	}
	error: string = ''
	changingRootAccount: boolean = false
	changingData = {
		curRootAccount: {
			label: '',
			address: '',
			password: '',
		},
		password: '',
	}


	constructor(
		public dialogRef: MatDialogRef<AccountdetaildialogComponent>,
		@Inject(MAT_DIALOG_DATA)
		public accountDetail: AccountDetail,
		private assetService: AssetService,
		private accountService: AccountService,
		private dialog: MatDialog
	) { }

	ngOnInit() {
		this.refresh()
	}

	refresh() {
		this.error = ''
		this.assetService.balance(this.accountDetail.account.address).subscribe(
			(result) => {
				if (result.error) {
					this.error = result.error
				} else {
					this.balance = result.balance
				}
			}
		)

		// check root account
		this.accountService
			.search({role: 'root'})
			.subscribe((result) => {
				if (result.error) {
					this.error = this.error
				} else {
					if (result.accounts.length > 1) {
						this.error = 'More than one root account?'
					} else if (result.accounts.length === 1) {
						const a = result.accounts[0]
						this.changingData.curRootAccount = {
							label: a.label,
							address: a.address,
							password: ''
						}
					}
				}
			})
	}

	onBanClicked() {
	}

	onUnbanClicked() {
	}

	onTransferToClicked() {
		this.dialog
			.open(TransferdialogComponent, {data: { account: this.accountDetail.account, transfer: 'to'}})
			.backdropClick().subscribe((result) => {
				this.refresh()
			})
	}

	onTransferFromClicked() {
		this.dialog
			.open(TransferdialogComponent, {data: { account: this.accountDetail.account, transfer: 'from'}})
			.backdropClick().subscribe((result) => {
				this.refresh()
			})
	}

	toggleChangingRootAccount() {
		this.changingRootAccount = !this.changingRootAccount
	}

	stopChangingRootAccount() {
		this.changingRootAccount = false
	}

	onSetRootAccount() {
		this.error = ''
		this.accountService.setAsRoot(
			this.accountDetail.account.address,
			this.changingData.password,
			this.changingData.curRootAccount.address,
			this.changingData.curRootAccount.password,
		)
		.subscribe((result) => {
			if (result.error) {
				this.error = result.error
			} else {
				this.accountDetail.account.role = result.role
				this.accountDetail.onRootAccountChanged(this.changingData.curRootAccount.address)
				this.changingData.password = ''
				this.changingData.curRootAccount.address = ''
				this.changingData.curRootAccount.password = ''
				this.stopChangingRootAccount()
			}
		})
	}

}
