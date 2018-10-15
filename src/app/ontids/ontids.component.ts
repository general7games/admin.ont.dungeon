import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core'
import { OntidService } from '../ontid.service';
import { OntID } from '../ontid';
import { MatDialog } from '@angular/material';
import { OntiddetaildialogComponent } from '../ontiddetaildialog/ontiddetaildialog.component';

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
	showOntIDDetails: (ontID: OntID) => void

	constructor(
		private ontIDService: OntidService,
		private dialog: MatDialog
	) {
		const target = this
		this.onOntIDAdded = (ontID) => {
			target.onOntIDAddedInternal(ontID)
		}
		this.showOntIDDetails = (ontID) => {
			target.showOntIDDetailsInternal(ontID)
		}
	 }

	ngOnInit() {
		this.error = ''
		this.ontIDService.list().subscribe((result) => {
			if (!result.error) {
				this.ontIDs = result.ontIDs
			} else {
				this.error = result.error
			}
		})
	}

	onOntIDAddedInternal(ontID: OntID) {
		this.ontIDs.unshift(ontID)
	}

	showOntIDDetailsInternal(ontID: OntID) {
		const target = this
		this.dialog.open(
			OntiddetaildialogComponent,
			{
				data: {
					ontID
				},
				autoFocus: false
			}
		)
	}

}

export const thisComponent = OntidsComponent
