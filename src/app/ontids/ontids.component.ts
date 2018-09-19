import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core'
import { OntidService } from '../ontid.service';
import { OntID } from '../ontid';

@Component({
	selector: 'app-ontids',
	templateUrl: './ontids.component.html',
	styleUrls: ['./ontids.component.css'],
	providers: [OntidService]
})
export class OntidsComponent implements OnInit {

	static title: string = 'Operators OntID'

	adminInitialized: boolean
	ontIDs: OntID[]
	error: string

	@ViewChild('ontIDList', { read: ViewContainerRef })
	ontIDListRef: ViewContainerRef

	constructor(private ontIDService: OntidService) { }

	ngOnInit() {
		this.checkAdminInitialized()
	}

	checkAdminInitialized(): void {
		this.ontIDService.getOntIDs().subscribe(
			(ontIDs) => {
				this.ontIDs = ontIDs
				this.adminInitialized = ontIDs.findIndex((ontid) => ontid.roles.findIndex((role) => role === 'admin') !== -1) !== -1
			}
		)
	}

	initAdminDelegate() {
		const target = this
		return function (newOne) {
			target.ontIDService.initAdmin(newOne.password)
			.subscribe((result) => {
				target.adminInitialized = result.inited
				if (result.inited) {
					target.ontIDs.unshift(result.result)
				} else {
					target.error = JSON.stringify(result.result)
				}
			})
		}
	}

	createNewDelegate() {
		const target = this
		return function (newOne) {
			target.ontIDService
			.create(newOne.label, newOne.password, newOne.role)
			.subscribe((result) => {

			})
		}
	}
}

export const thisComponent = OntidsComponent
