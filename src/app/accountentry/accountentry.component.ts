import { Component, OnInit, Input } from '@angular/core'
import { Account } from '../account'

@Component({
	selector: 'app-accountentry',
	templateUrl: './accountentry.component.html',
	styleUrls: ['./accountentry.component.css']
})
export class AccountentryComponent implements OnInit {

	@Input()
	account: Account

	constructor() { }

	ngOnInit() {
	}

}
