import { Component, OnInit, Inject } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'
import { AssetService } from '../asset.service'
import { Account } from '../account'

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
		public account: Account,
		private assetService: AssetService
	) { }

	ngOnInit() {
		this.refresh()
	}

	refresh() {
		this.error = ''
		this.assetService.balance(this.account.address).subscribe(
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

}
