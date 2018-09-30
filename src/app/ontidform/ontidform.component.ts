import { Component, Input, OnInit } from '@angular/core'
import { OntID } from '../ontid'
import { OntidService } from '../ontid.service'
import { NGXLogger } from 'ngx-logger'
import { AccountService } from '../account.service';
import { Account } from '../account'

@Component({
	selector: 'app-ontidform',
	templateUrl: './ontidform.component.html',
	styleUrls: ['./ontidform.component.css'],
	providers: [NGXLogger, AccountService, OntidService]
})
export class OntidformComponent implements OnInit {

	newOntID = {
		label: '',
		password: '',
		rePassword: '',
		keyStore: '',
		role: 'admin',
		ong: 500
	}

	roles = OntidService.rolesList()

	error: string = ''
	adminInitialized: boolean = false
	rootAccount: Account
	rootPassword: string

	@Input()
	onOntIDAdded: (ontID: OntID) => void

	constructor(
		private logger: NGXLogger,
		private accountService: AccountService,
		private ontIDService: OntidService
	) { }

	ngOnInit(): void {
		this.accountService.search({role: 'root'})
			.subscribe((result) => {
				if (result.error) {
					this.error = result.error
				} else {
					if (result.accounts && result.accounts.length > 0) {
						this.rootAccount = result.accounts[0]
					}
				}
			})
	}


	onSubmit() {
		if (!this.rootAccount || !this.rootPassword) {
			this.error = 'Root account and password are required'
			return
		}
		this.error = ''
		if (this.newOntID.keyStore) {
			// import
			this.ontIDService
				.import(
					this.rootPassword,
					this.newOntID.keyStore, this.newOntID.password,
					this.newOntID.role)
				.subscribe((result) => {
					if (result.error) {
						this.error = result.error
					} else {
						this.onOntIDAdded(result.ontID)
					}
				})
		} else {
			// create new
			this.ontIDService
				.create(
					this.rootPassword,
					this.newOntID.label,
					this.newOntID.password,
					this.newOntID.role)
				.subscribe((result) => {
					if (result.error) {
						this.error = result.error
					} else {
						this.onOntIDAdded(result.ontID)
					}
				})
		}
	}

}
