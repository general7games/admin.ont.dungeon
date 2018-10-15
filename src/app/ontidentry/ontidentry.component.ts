import { Component, OnInit, Input } from '@angular/core';
import { OntID } from '../ontid'
import * as animations from '../animations'

@Component({
	selector: 'app-ontidentry',
	templateUrl: './ontidentry.component.html',
	styleUrls: ['./ontidentry.component.css'],
	animations: [
		animations.makeTriggerHighlight('showEntry', 'lightgreen')
	]
})
export class OntidentryComponent implements OnInit {

	@Input()
	ontID: OntID

	@Input()
	entryIndex: number

	presentingState = 'start'

	constructor() { }

	ngOnInit() {
		setTimeout(() => {
			this.presentingState = 'end'
		}, 500)
	}

	@Input()
	showDetailsDelegate: (ontID: OntID) => void

	showDetails() {
		if (this.showDetailsDelegate) {
			this.showDetailsDelegate(this.ontID)
		}
	}

}
