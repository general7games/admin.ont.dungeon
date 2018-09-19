import { Component, Input } from '@angular/core'
import { OntID } from '../ontid'
import { OntidService } from '../ontid.service'
import { NGXLogger } from 'ngx-logger'

@Component({
	selector: 'app-ontidform',
	templateUrl: './ontidform.component.html',
	styleUrls: ['./ontidform.component.css'],
	providers: [NGXLogger]
})
export class OntidformComponent {

	roles: string[] = ['admin', 'operator']

	newModel = {
		label: '',
		password: '',
		rePassword: '',
		rootAddress: '',
		rootPassword: '',
		role: 'admin',
		ong: 500
	}

	@Input()
	title: string

	@Input()
	initAdmin: boolean

	constructor(
		private logger: NGXLogger
	) { }

	@Input()
	submitDelegate(newOne) {
		this.logger.error('app-ontidform without onSubmitDelegate')
	}

	onSubmit() {
		this.submitDelegate(this.newModel)
	}

}
