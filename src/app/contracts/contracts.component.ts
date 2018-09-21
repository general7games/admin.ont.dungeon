import { Component, OnInit } from '@angular/core'
import * as utils from '../utils'

@Component({
	selector: 'app-contracts',
	templateUrl: './contracts.component.html',
	styleUrls: ['./contracts.component.css']
})
export class ContractsComponent implements OnInit {

	static title: string = 'Contracts'

	deployStatus = {
		ontid: '',
		password: '',
		contractHash: '',
		contractContent: '',
		contractName: '',
		contractVersion: '',
		contractAuthor: '',
		contractEmail: '',
		contractDesc: ''
	}

	constructor() { }

	ngOnInit() {
	}

	onFileChanged(files) {
		const fileToDeploy: File = files[0]
		this.deployStatus.contractName = fileToDeploy.name
		// convert to hex byte
		const reader = new FileReader()
		reader.addEventListener('loadend', (ev) => {
			const buffer = <ArrayBuffer>reader.result
			const hexString = utils.ab2HexString(buffer)
			this.deployStatus.contractContent = hexString
			this.deployStatus.contractHash = utils.hash160(hexString)
		})
		reader.readAsArrayBuffer(fileToDeploy)
	}

}

export const thisComponent = ContractsComponent
