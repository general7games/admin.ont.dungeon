import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AssetService } from '../asset.service';
import { Account } from '../account'

export interface TransferOption {
	account: Account
	transfer: 'to'|'from'
}

@Component({
	selector: 'app-transferdialog',
	templateUrl: './transferdialog.component.html',
	styleUrls: ['./transferdialog.component.css'],
	providers: [AssetService]
})
export class TransferdialogComponent implements OnInit {

	assets = AssetService.assetsList()

	transferStatus = {
		address: '',
		password: '',
		asset: 'ONG',
		amount: 0
	}

	showTransferSuccess: boolean = false
	error: string = ''

	constructor(
		public dialogRef: MatDialogRef<TransferdialogComponent>,
		@Inject(MAT_DIALOG_DATA)
		public transferOption: TransferOption,
		private assetService: AssetService
	) { }

	ngOnInit() {
	}

	confirm() {
		this.showTransferSuccess = false
		this.error = ''
		if (this.transferOption.transfer === 'to') {
			this.assetService.transfer(
				this.transferStatus.address,
				this.transferStatus.password,
				this.transferOption.account.address,
				this.transferStatus.asset,
				this.transferStatus.amount
			).subscribe((result) => {
				if (result.error) {
					this.error = result.error
				} else {
					this.error = ''
					this.showTransferSuccess = true
					this.transferStatus.password = ''
				}
			})
		} else if (this.transferOption.transfer === 'from') {
			this.assetService.transfer(
				this.transferOption.account.address,
				this.transferStatus.password,
				this.transferStatus.address,
				this.transferStatus.asset,
				this.transferStatus.amount
			).subscribe((result) => {
				if (result.error) {
					this.error = result.error
				} else {
					this.error = ''
					this.showTransferSuccess = true
					this.transferStatus.password = ''
				}
			})
		}
	}

	isCountableAsset(): boolean {
		const asset = this.assets.find((x) => x.value === this.transferStatus.asset)
		if (asset) {
			return asset.countable
		}
		return false
	}

}
