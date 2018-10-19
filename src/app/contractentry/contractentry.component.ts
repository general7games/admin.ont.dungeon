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
	allOntIDs: OntID[]

	@Input()
	entryIndex: number

	adminOntIDToInit: string = ''
	adminOntIDPassword: string = ''

	error: string = ''

	roleToAdd: string = ''
	ontIDToAdd = {}

	isOperating: boolean = false

	constructor(
		private contractService: ContractService,
		private dialog: MatDialog
	) { }

	ngOnInit() {
		if (this.contract.roles) {
			this.contract.roles.forEach((roleInfo) => {
				this.ontIDToAdd[roleInfo.role] = ''
			})
		}
	}

	getAvailableOntIDs(role: string): OntID[] {
		const availableOntIDs = new Array<OntID>()
		this.allOntIDs.forEach((ontID) => {
			if (ontID.ontid === this.contract.adminOntID.ontID) {
				return
			}
			const roleInfo = this.contract.roles.find((r) => r.role === role)
			if (roleInfo) {
				if (roleInfo.ontids.findIndex((ontid) => ontid === ontID.ontid) !== -1) {
					return
				}
			}
			availableOntIDs.push(ontID)
		})
		return availableOntIDs
	}

	onSubmitInitAdmin() {
		this.error = ''
		this.isOperating = true
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
				this.isOperating = false
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
						this.isOperating = true
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
								this.isOperating = false
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
						content: `<b style="color: red">Authorization</b><br>Add <span style="color: blue;">${this.ontIDToAdd[role]}</span> to role <span style="color: blue;">${role}</span>`,
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
						this.isOperating = true
						this.contractService
							.addOntIDToRole(this.contract.name, this.ontIDToAdd[role], role, this.contract.adminOntID.ontID, password)
							.subscribe((result) => {
								if (result.error) {
									this.error = result.error
								} else {
									const roleInfo = this.contract.roles.find((r) => r.role == role)
									if (roleInfo) {
										roleInfo.ontids.push(this.ontIDToAdd[role])
									}
									this.ontIDToAdd[role] = ''
								}
								this.isOperating = false
							})
					} else {
						this.error = 'Empty Password'
					}
				}
			})
	}


}
