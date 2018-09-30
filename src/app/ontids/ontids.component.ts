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

	ontIDs: OntID[]
	error: string = ''

	onOntIDAdded: (ontID: OntID) => void

	constructor(private ontIDService: OntidService) {
		const target = this
		this.onOntIDAdded = (ontID) => {
			target.onOntIDAddedInternal(ontID)
		}
	 }

	ngOnInit() {

	}

	onOntIDAddedInternal(ontID: OntID) {
		this.ontIDs.unshift(ontID)
	}

}

export const thisComponent = OntidsComponent
