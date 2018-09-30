import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import axios from 'axios';
import { NGXLogger } from 'ngx-logger'

import { OntID } from './ontid'
import { environment } from '../environments/environment';
import { getURL } from './utils'
import { Account } from './account'

interface OntIDResult {
	error?: string
	ontID?: OntID
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

	constructor(private logger: NGXLogger) { }

	getOntIDs(): Observable<OntID[]> {
		const ontIDs = new Array<OntID>()
		axios.get(getURL(environment.backend.admin.listOntID))
			.then((resp) => {
				if (resp.data.error === 0) {
					resp.data.result.forEach((ontID) => {
						ontIDs.push(new OntID(ontID.ontid, ontID.roles))
					})
				} else {
					this.logger.error(resp.data)
				}
			})
			.catch((err) => {
				this.logger.error(err)
			})
		return of(ontIDs)
	}

	import(rootAccountPassword: string, keyStore: string, password: string, role: string): Observable<OntIDResult> {
		this.logger.debug('import')
		return new Observable<OntIDResult>((observer) => {
			observer.next({error: 'not implemented'})
		})
	}

	create(rootAccountPassword: string, label: string, password: string, role: string): Observable<OntIDResult> {
		this.logger.debug(`create ontID: ${label} ${role}`)
		return new Observable<OntIDResult>((observer) => {
			observer.next({error: 'not implemented'})
		})
	}
}
