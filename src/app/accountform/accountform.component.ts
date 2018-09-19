import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-accountform',
	templateUrl: './accountform.component.html',
	styleUrls: ['./accountform.component.css']
})
export class AccountformComponent implements OnInit {

	importAccount = {
		label: '',
		password: '',
		rePassword: '',
		mnemonic: '',
		wif: ''
	}

	constructor() { }

	ngOnInit() {
	}

	onSubmitWithMnemonic() {

	}

	onSubmitWithWIF() {

	}

}
