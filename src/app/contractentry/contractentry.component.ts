import { Component, OnInit, Input } from '@angular/core';
import { Contract } from '../contract';
import { OntID } from '../ontid';
import { ContractService } from '../contract.service';
import { MatDialog } from '@angular/material';
import { ConfirmdialogComponent } from '../confirmdialog/confirmdialog.component';

@Component({
	selector: 'app-contractentry',
	templateUrl: './contractentry.component.html',
	styleUrls: ['./contractentry.component.css'],
	providers: [ContractService]
})
export class ContractentryComponent implements OnInit {

	@Input()
	contract: Contract

	@Input()
	adminOntIDs: OntID[]

	@Input()
	entryIndex: number

	adminOntIDToInit: string = ''
	adminOntIDPassword: string = ''

	error: string = ''

	roleToAdd: string = ''
	ontIDToAdd = {}

	constructor(
		private contractService: ContractService,
		private dialog: MatDialog
	) { }

	ngOnInit() {
	}

	onSubmitInitAdmin() {
		this.error = ''
		this.contractService
			.initAdmin(this.contract.name, this.adminOntIDToInit, this.adminOntIDPassword)
			.subscribe((result) => {
				if (result.error) {
					this.error = result.error
				} else  {
					this.contract.adminOntID = {
						ontID: this.adminOntIDToInit,
						keyNo: 1
					}
				}
			})
	}

	onSubmitAddRole() {
		this.error = ''
		if (!this.contract.adminOntID
		|| !this.contract.adminOntID.ontID) {
			this.error = 'Admin OntID required'
			return
		}
		this.dialog
			.open(
				ConfirmdialogComponent,
				{
					data: {
						content: `<b style="color: red">Authorization</b><br/>Add role <b style="color: blue">${this.roleToAdd}</b> to contract`,
						input: [
							{
								label: 'Password for admin <span style="color: blue">' + this.contract.adminOntID.ontID + '</span>',
								type: 'password',
								required: true,
								mark: 'password'
							}
						]
					},
					autoFocus: false
				})
			.afterClosed()
			.subscribe((result) => {
				if (result) {
					const password = result.input[0].content
					if (password) {
						this.contractService
							.addRole(
								this.contract.name, this.roleToAdd,
								this.contract.adminOntID.ontID, password)
							.subscribe((result) => {
								if (result.error) {
									this.error = result.error
								} else {
									this.contract.roles.push({role: this.roleToAdd, ontids:[]})
									this.roleToAdd = ''
								}
							})
					} else {
						this.error = 'Empty Password'
					}
				}
			})
	}

	onSubmitAddOntIDToRole(role) {
		this.error = ''
		if (!this.contract.adminOntID
		|| !this.contract.adminOntID.ontID) {
			this.error = 'Admin OntID required'
			return
		}
		this.dialog
			.open(
				ConfirmdialogComponent,
				{
					data: {
						content: `<b style="color: red">Authorization</b>`,
						input: [
							{
								label: 'Password for admin <span style="color: blue">' + this.contract.adminOntID.ontID + '</span>',
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
				if (result) {
					const password = result.input[0].content
					if (password) {
						// todo:

					} else {
						this.error = 'Empty Password'
					}
				}
			})
	}

}
