import { Injectable } from '@angular/core'
import { environment } from '../environments/environment'
import { Observable, observable } from 'rxjs'
import { getURL } from './utils'
import axios from 'axios'
import { NGXLogger } from 'ngx-logger';

export interface TransferResult {
	error?: string
}
export interface BalanceResult {
	error?: string
	result?: {
		ONT: string
		ONG: string
	}
}

@Injectable({
	providedIn: 'root'
})
export class AssetService {

	static assets = {
		ONG: { viewValue: 'ONG', countable: true},
		ONT: { viewValue: 'ONT', countable: true},
		GEM: { viewValue: 'GEM', countable: true},
		GameAsset: { viewValue: 'Game Asset', countable: false }
	}
	static assetsList() {
		const list = new Array<any>()
		for (let key in this.assets) {
			const a = this.assets[key]
			list.push({ value: key, viewValue: a.viewValue, countable: a.countable})
		}
		return list
	}
	static getAssetViewValue(type: string) {
		return this.assets[type].viewValue
	}


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

	balance(address: string): Observable<BalanceResult> {
		return new Observable<BalanceResult>((observer) => {
			axios.get(getURL(environment.backend.asset.balance), {params: { address }})
			.then((resp) => {
				if (resp.data.error === 0) {
					observer.next({
						result: resp.data.result
					})
				} else {
					observer.next({
						error: `balance FAILED with error code ${resp.data.error}`
					})
				}
			})
			.catch((err) => {
				observer.next({
					error: err.message
				})
			})
		})
	}
}
