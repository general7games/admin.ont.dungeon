import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { OntID } from '../ontid';
import { NGXLogger } from 'ngx-logger';
import { ConfirmdialogComponent } from '../confirmdialog/confirmdialog.component';
import { AccountService } from '../account.service';
import { AssetService } from '../asset.service';
import { OntidService } from '../ontid.service';
import { TransferdialogComponent } from '../transferdialog/transferdialog.component';

export interface OntIDDetail {
	ontID: OntID
}

@Component({
	selector: 'app-ontiddetaildialog',
	templateUrl: './ontiddetaildialog.component.html',
	styleUrls: ['./ontiddetaildialog.component.css'],
	encapsulation: ViewEncapsulation.None,
	providers: [NGXLogger, AccountService, AssetService, OntidService]
})
export class OntiddetaildialogComponent implements OnInit {

	error: string = ''
	address: string = ''
	balance = {
		ONT: '0',
		ONG: '0'
	}

	constructor(
		public dialogRef: MatDialogRef<OntiddetaildialogComponent>,
		@Inject(MAT_DIALOG_DATA)
		public ontIDDetail: OntIDDetail,
		private accountService: AccountService,
		private ontIDService: OntidService,
		private assetService: AssetService,
		private dialog: MatDialog,
		private logger: NGXLogger
	) { }

	ngOnInit() {
		this.refresh()
	}

	refresh() {
		this.ontIDService
			.getMainAccountAddress(this.ontIDDetail.ontID)
			.subscribe((address) => {
				this.address = address
				this.assetService
					.balance(address)
					.subscribe((result) => {
						if (result.error) {
							this.error = result.error
						} else {
							this.balance = result.balance
						}
					})
			})
	}

	onDeleteClicked(role) {
		this.logger.debug('onDeleteClicked ' + role)

		this.accountService
			.search({ role: 'root' })
			.subscribe((result) => {
				if (result.error) {
					this.dialog.open(
						ConfirmdialogComponent,
						{
							data: {
								content: `<div class="alert alert-danger">${result.error}</div>`
							}
						}
					)
					return
				}
				if (!result.accounts || result.accounts.length == 0) {
					this.dialog.open(
						ConfirmdialogComponent,
						{
							data: {
								content: '<div class="alert alert-danger">Root Account not found!</div>'
							}
						}
					)
					return
				}
				const rootAccount = result.accounts[0].address
				this.dialog
					.open(
						ConfirmdialogComponent,
						{
							data: {
								content: 'Confirm to DELETE role <span style="color: blue">[' + role + ']</span>',
								input: [
									{
										label: 'Password for Root Account: ' + rootAccount,
										type: 'password',
										required: true,
										mark: 'password'
									}
								]
							},
							autoFocus: false
						}
					)
					.afterClosed()
					.subscribe((result) => {
						this.logger.debug('confirm delete')
						this.updateOntIDDetails()
					})
			})


	}

	onNewClicked() {
		this.logger.debug('onNewClicked')
	}

	onTransferToClicked() {
		if (this.address) {
			this.dialog
				.open(TransferdialogComponent, {data: { account: this.address, transfer: 'to'}})
				.backdropClick().subscribe((result) => {
					this.refresh()
				})
		}
	}

	onTransferFromClicked() {
		this.dialog
			.open(TransferdialogComponent, {data: { account: this.address, transfer: 'from'}})
			.backdropClick().subscribe((result) => {
				this.refresh()
			})
	}




	updateOntIDDetails() {

	}
}
