import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import axios from 'axios'
import { getURL } from './utils'
import { environment } from '../environments/environment'
import { NGXLogger } from 'ngx-logger';

export interface DeployContractContent {
	ontID: {
		ontid: string
		password: string
	}
	script: string
	name: string
	version: string
	description: string
	author: string
	email: string
	storage: boolean
	abi: any
}

export interface DeployContractResult {
	error?: string
}

export interface ListContractResult {
	error?: string
}

@Injectable({
	providedIn: 'root'
})
export class ContractService {

	constructor(private logger: NGXLogger) { }

	deploy(content: DeployContractContent): Observable<DeployContractResult> {
		return new Observable<DeployContractResult>((observer) => {
			axios
				.post(getURL(environment.backend.contract.deploy), content)
				.then((resp) => {
					if (resp.data.error === 0) {
						this.logger.info('deploy SUCCESS', resp.data)
						observer.next({})
					} else {
						const msg = `create FAILED: ${resp.data.error}`
						this.logger.error(msg)
						observer.next({ error: msg })
					}
				})
				.catch((err) => {
					this.logger.error('deploy ERROR', err)
					observer.next({
						error: err.message
					})
				})
		})
	}

	list(): Observable<ListContractResult> {
		return new Observable<ListContractResult>((observer) => {

		})
	}
}
