import { Component, OnInit } from '@angular/core'
import * as utils from '../utils'
import { OntidService } from '../ontid.service';
import { OntID } from '../ontid'
import { MatDialog } from '@angular/material';
import { ConfirmdialogComponent } from '../confirmdialog/confirmdialog.component';
import { NGXLogger } from 'ngx-logger';
import { ContractService } from '../contract.service';
import { Contract } from '../contract'

@Component({
	selector: 'app-contracts',
	templateUrl: './contracts.component.html',
	styleUrls: ['./contracts.component.css'],
	providers: [OntidService, NGXLogger, ContractService]
})
export class ContractsComponent implements OnInit {

	static title: string = 'Contracts'

	deployStatus = {
		ontid: '',
		password: '',
		contractHash: '',
		contractFile: '',
		contractContent: '',
		contractABIFile: '',
		contractABIContent: null,
		contractName: '',
		contractVersion: '',
		contractAuthor: '',
		contractEmail: '',
		contractDesc: '',
		contractStorage: true,
		migrate: false,
		contractToMigrate: '',
		initAdmin: true
	}

	adminOntIDs: OntID[]
	allOntIDs: OntID[]
	error: string
	hashError: boolean
	contracts: Contract[]

	constructor(
		private ontidService: OntidService,
		private contractService: ContractService,
		private dialog: MatDialog,
		private logger: NGXLogger
	) { }

	ngOnInit() {
		this.hashError = true
		// list all admin OntID
		this.ontidService
			.list()
			.subscribe((result) => {
				if (result.error) {
					this.error = result.error
					return
				}
				if (!result.ontIDs) {
					this.error = 'No Admin OntID found'
					return
				}
				const adminOntIDs = new Array<OntID>()
				const allOntIDs = new Array<OntID>()
				result.ontIDs.forEach((ontID) => {
					if (ontID.roles.indexOf('admin') !== -1) {
						adminOntIDs.push(ontID)
					}
					allOntIDs.push(ontID)
				})
				this.allOntIDs = allOntIDs
				if (adminOntIDs.length === 0) {
					this.error = 'No Admin OntID found'
					return
				}
				this.adminOntIDs = adminOntIDs
			})
		this.contractService
			.list()
			.subscribe((result) => {
				if (result.error) {
					this.error = result.error
				} else {
					this.contracts = result.contracts
				}
			})
	}

	onContractFileChanged(files) {
		const fileToDeploy: File = files[0]
		this.deployStatus.contractName = fileToDeploy.name
		// convert to hex byte
		const reader = new FileReader()
		reader.addEventListener('loadend', (ev) => {
			const buffer = <ArrayBuffer>reader.result
			const hexString = utils.ab2HexString(buffer)
			this.deployStatus.contractContent = hexString
			this.deployStatus.contractHash = utils.hash160(hexString)
			this.checkHash()
		})
		reader.readAsArrayBuffer(fileToDeploy)
	}

	checkHash() {
		if (this.deployStatus.contractHash
		&& this.deployStatus.contractABIContent
		&& this.deployStatus.contractABIContent.hash) {
			try {
				const hash = '0x'+utils.reverseHex(this.deployStatus.contractHash)
				if (hash === this.deployStatus.contractABIContent.hash) {
					this.hashError = false
				} else {
					this.hashError = true
				}
			} catch (err) {
				this.hashError = true
			}
		} else {
			this.hashError = true
		}
	}

	onABIFileChanged(files) {
		const abiFile: File = files[0]
		const reader = new FileReader()
		reader.addEventListener('loadend', (ev) => {
			const abiContent = JSON.parse(reader.result)
			this.deployStatus.contractABIContent = abiContent
			this.checkHash()
		})
		reader.readAsText(abiFile)
	}

	onDeploy() {
		this.error = ''
		this.dialog
			.open(
				ConfirmdialogComponent,
				{
					data: {
						content: `Confirm to deploy ${this.deployStatus.contractName}?`
					},
					autoFocus: false
				}
			)
			.afterClosed()
			.subscribe((result) => {
				if (result) {
					this.contractService
						.deploy({
							ontID: {
								ontid: this.deployStatus.ontid,
								password: this.deployStatus.password
							},
							script: this.deployStatus.contractContent,
							name: this.deployStatus.contractName,
							version: this.deployStatus.contractVersion,
							description: this.deployStatus.contractDesc,
							author: this.deployStatus.contractAuthor,
							email: this.deployStatus.contractEmail,
							abi: this.deployStatus.contractABIContent,
							storage: this.deployStatus.contractStorage,
							initAdmin: this.deployStatus.initAdmin
						})
						.subscribe((deployResult) => {
							this.deployStatus.password = ''
							if (deployResult.error) {
								this.error = deployResult.error
							} else {
								// reset to default
								this.deployStatus.ontid = ''
								this.deployStatus.contractABIContent = null
								this.deployStatus.contractABIFile = ''
								this.deployStatus.contractAuthor = ''
								this.deployStatus.contractContent = ''
								this.deployStatus.contractDesc = ''
								this.deployStatus.contractEmail = ''
								this.deployStatus.contractFile = ''
								this.deployStatus.contractHash = ''
								this.deployStatus.contractName = ''
								this.deployStatus.contractToMigrate = ''
								this.deployStatus.contractVersion = ''
								this.deployStatus.contractStorage = true
								this.deployStatus.migrate = false
								this.deployStatus.initAdmin = true
							}
						})
				}
			})
	}

}

export const thisComponent = ContractsComponent
