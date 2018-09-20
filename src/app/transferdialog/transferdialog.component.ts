import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AssetService } from '../asset.service';
import { Account } from '../account'

@Component({
	selector: 'app-transferdialog',
	templateUrl: './transferdialog.component.html',
	styleUrls: ['./transferdialog.component.css'],
	providers: [AssetService]
})
export class TransferdialogComponent implements OnInit {

	assets = [
		{value: 'ONG', viewValue: 'ONG', countable: true},
		{value: 'ONT', viewValue: 'ONT', countable: true},
		{value: 'GEM', viewValue: 'GEM', countable: true},
		{value: 'GameAsset', viewValue: 'Game Asset'}
	]

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
		public account: Account,
		private assetService: AssetService
	) { }

	ngOnInit() {
	}

	cancel() {
		this.dialogRef.close()
	}

	confirm() {
		this.showTransferSuccess = false
		this.error = ''
		this.assetService.transfer(
			this.transferStatus.address,
			this.transferStatus.password,
			this.account.address,
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

	isCountableAsset(): boolean {
		const asset = this.assets.find((x) => x.value === this.transferStatus.asset)
		if (asset) {
			return asset.countable
		}
		return false
	}
}
