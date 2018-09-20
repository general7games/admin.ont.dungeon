import { Injectable } from '@angular/core'
import { environment } from '../environments/environment'
import { Observable } from 'rxjs'
import { getURL } from './utils'
import axios from 'axios'
import { NGXLogger } from 'ngx-logger';

export interface TransferResult {
	error?: string
}

@Injectable({
	providedIn: 'root'
})
export class AssetService {

	constructor(private logger: NGXLogger) { }

	transfer(from: string, password: string, to: string, asset: string, amount: number): Observable<TransferResult> {
		return new Observable<TransferResult>((observer) => {
			axios.post(
				getURL(environment.backend.asset.transfer),
				{
					account: {
						address: from,
						password
					},
					to,
					asset,
					amount
				}
			)
			.then((resp) => {
				const transferMessage = `${from} -> ${to}, ${asset}, ${amount}`
				if (resp.data.error === 0) {
					this.logger.info(`transfer SUCCESS: ${transferMessage}`)
					observer.next({
					})
				} else {
					const msg = `transfer FAILED: ${transferMessage}`
					this.logger.error(msg, resp.data)
					observer.next({
						error: msg
					})
				}
			})
			.catch((err) => {
				this.logger.error(`transfer ERROR`, err)
				observer.next({
					error: err.message
				})

			})
		})
	}
}
