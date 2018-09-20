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

	presentingState = 'start'

	constructor() { }

	ngOnInit() {
		setTimeout(() => {
			this.presentingState = 'end'
		}, 500)
	}

	@Input()
	transferDelegate: (account: Account) => Observable<boolean>
	@Input()
	banDelegate: (account: Account) => Account
	@Input()
	showDetailsDelegate: (account: Account) => void

	transfer() {
		if (this.transferDelegate) {
			this.transferDelegate(this.account).subscribe((result) => {

			})
		}
	}

	ban() {
		if (this.banDelegate) {
			this.banDelegate.apply(this, this.account)
		}
	}

	showDetails() {
		if (this.showDetailsDelegate) {
			this.showDetailsDelegate.apply(this, this.account)
		}
	}

}
