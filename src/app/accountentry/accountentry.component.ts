import { Component, OnInit, Input } from '@angular/core'
import { Account } from '../account'
import * as animations from '../animations'

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

	presentingState = 'start'

	constructor() { }

	ngOnInit() {
		setTimeout(() => {
			this.presentingState = 'end'
		}, 500)
	}

}
