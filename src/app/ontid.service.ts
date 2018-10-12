import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import axios from 'axios';
import { NGXLogger } from 'ngx-logger'

import { OntID } from './ontid'
import { environment } from '../environments/environment';
import { getURL } from './utils'
import { Account } from './account'

export interface OntIDResult {
	error?: string
	ontID?: OntID
}

export interface OntIDListResult {
	error?: string
	ontIDs?: OntID[]
}

@Injectable({
	providedIn: 'root'
})
export class OntidService {

	static roles = {
		admin: {viewValue: 'Administrator'},
		op: {viewValue: 'Operator'}
	}

	static rolesList() {
		const list = new Array<any>()
		for (let key in this.roles) {
			const r = this.roles[key]
			list.push({
				value: key,
				viewValue: r.viewValue
			})
		}
		return list
	}

	static convertToOntIDs(ontIDs): OntID[] {
		const converted = new Array<OntID>()
		ontIDs.forEach((ontID) => {
			converted.push(new OntID(ontID.label, ontID.ontid, ontID.roles))
		})
		return converted
	}

	constructor(private logger: NGXLogger) { }

	list(): Observable<OntIDListResult> {
		return new Observable<OntIDListResult>(
			(observer) => {
				axios
					.get(getURL(environment.backend.ontid.list))
					.then((resp) => {
						if (resp.data.error === 0) {
							observer.next({
								ontIDs: OntidService.convertToOntIDs(resp.data.result)
							})
						} else {
							const msg = `list FAILED: ${resp.data.error}`
							this.logger.error(msg)
							observer.next({error: msg})
						}
					})
					.catch((err) => {
						observer.next({error: err.message})
						this.logger.error('list ERROR', err)
					})
			}
		)
	}

	import(rootAccountPassword: string, keyStore: string, password: string, role: string): Observable<OntIDResult> {
		this.logger.debug('import')
		return new Observable<OntIDResult>((observer) => {
			observer.next({error: 'not implemented'})
		})
	}

	create(rootAccountAddress: string, rootAccountPassword: string, label: string, password: string, role: string): Observable<OntIDResult> {
		this.logger.debug(`create ontID: ${label} ${role}`)
		return new Observable<OntIDResult>((observer) => {
			axios
				.post(
					getURL(environment.backend.ontid.createAndSave),
					{
						account: {
							address: rootAccountAddress,
							password: rootAccountPassword
						},
						label,
						password,
						role
					}
				)
				.then((resp) => {
					if (resp.data.error === 0) {
						observer.next({ontID: resp.data.result.ontID})
					} else {
						const msg = `create FAILED: ${resp.data.error}`
						this.logger.error(msg)
						observer.next({error: msg})
					}
				})
				.catch((err) => {
					this.logger.error('create ERROR', err)
					observer.next({error: err.message})
				})
		})
	}
}
