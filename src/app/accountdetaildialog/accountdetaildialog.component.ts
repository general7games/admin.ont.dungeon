import { Component, OnInit, Inject } from '@angular/core'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'
import { AssetService } from '../asset.service'
import { Account } from '../account'
import { TransferdialogComponent } from '../transferdialog/transferdialog.component';

export interface AccountDetail {
	account: Account
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


	constructor(
		public dialogRef: MatDialogRef<AccountdetaildialogComponent>,
		@Inject(MAT_DIALOG_DATA)
		public accountDetail: AccountDetail,
		private assetService: AssetService,
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
					this.balance.ONG = result.result.ONG
					this.balance.ONT = result.result.ONT
				}
			}
		)
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

}
