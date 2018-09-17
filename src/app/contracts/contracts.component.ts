import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-contracts',
	templateUrl: './contracts.component.html',
	styleUrls: ['./contracts.component.css']
})
export class ContractsComponent implements OnInit {

	static title: string = 'Contracts'

	constructor() { }

	ngOnInit() {
	}

}

export const thisComponent = ContractsComponent
