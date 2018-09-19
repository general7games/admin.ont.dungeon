import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import axios from 'axios';
import { NGXLogger } from 'ngx-logger'

import { OntID } from './ontid'
import { environment } from '../environments/environment';
import { getURL } from './utils'

@Injectable({
	providedIn: 'root'
})
export class OntidService {

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

	initAdmin(password: string): Observable<{ inited: boolean, result: any }> {
		this.logger.debug('initAdmin')
		return new Observable((observer) => {
			axios.post(getURL(environment.backend.admin.init), { password })
				.then((resp) => {
					if (resp.data.error === 0) {
						this.logger.info('initAdmin SUCCESS', resp.data)
						observer.next({
							inited: true,
							result: new OntID(resp.data.result.ontid, resp.data.result.roles)
						})
					} else {
						this.logger.error('initAdmin FAILED', resp.data)
						observer.next({
							inited: false,
							result: resp.data
						})
					}
				})
				.catch((err) => {
					this.logger.error('initAdmin ERROR', err)
					observer.next({
						inited: false,
						result: err
					})
				})
		})
	}

	create(label: string, password: string, role: string): Observable<any> {
		this.logger.debug(`create ontID: ${label} ${role}`)
		return of(false)
	}
}
