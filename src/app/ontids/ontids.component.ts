import { Component } from '@angular/core'

@Component({
	selector: 'app-ontids',
	templateUrl: './ontids.component.html',
	styleUrls: ['./ontids.component.css']
})
export class OntidsComponent {

	static title: string = 'Operators OntID'

	constructor() { }

	ngOnInit() {
	}

}

export const thisComponent = OntidsComponent
