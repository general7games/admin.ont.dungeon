import { Component, OnInit, Input } from '@angular/core'
import { Account } from '../account'
import * as animations from '../animations'
import { Observable } from 'rxjs';

@Component({
	selector: 'app-accountentry',
	templateUrl: './accountentry.component.html',
	styleUrls: ['./accountentry.component.css'],
	animations: [
		animations.makeTriggerHighlight('showEntry', 'lightgreen')
	]
})
export class AccountentryComponent implements OnInit {

	@Input()
	account: Account

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
	showDetailsDelegate: (account: Account) => void

	showDetails() {
		if (this.showDetailsDelegate) {
			this.showDetailsDelegate(this.account)
		}
	}

}
