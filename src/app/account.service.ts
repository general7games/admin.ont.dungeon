import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { Account } from './account'
import axios from 'axios'
import { getURL } from './utils'
import { environment } from '../environments/environment'
import { PagingCursor } from './types'
import { Accounts } from './mock-accounts'
import { NGXLogger } from 'ngx-logger'

export interface ListAccountResult {
	error?: string
	cursor?: PagingCursor
	accounts?: Account[]
}

export interface AccountResult {
	error?: string
	account?: Account
}

export interface AccountInfo {
	label: string,
	address: string,
	key: string,
	salt: string,
	password: string,
	parameters?: {
		curve: string
	},
	scrypt?: {
		p: number,
		n: number,
		r: number,
		dkLen: number
	}
}

@Injectable({
	providedIn: 'root'
})
export class AccountService {

	static convertToAccounts(accounts): Account[] {
		const converted = new Array<Account>()
		accounts.forEach((a) => {
			converted.push(new Account(a.label, a.address))
		})
		return converted
	}

	constructor(private logger: NGXLogger) { }

	getAccounts(cursor?: PagingCursor): Observable<ListAccountResult> {
		return new Observable<ListAccountResult>((observer) => {
			axios.get(getURL(environment.backend.account.list), { params: cursor })
				.then((resp) => {
					if (resp.data.error === 0) {
						observer.next({
							cursor: new PagingCursor(resp.data.result.cursor.before, resp.data.result.cursor.after),
							accounts: AccountService.convertToAccounts(resp.data.result.accounts)
						})
					} else {
						observer.next({
							error: JSON.stringify(resp.data)
						})
						this.logger.error(`getAccounts FAILED: ${resp.data.error}`)
					}
				})
				.catch((err) => {
					observer.next({
						error: err.message
					})
					this.logger.error('getAccounts ERROR', err)
				})
		})
	}

	createAccount(label: string, password: string): Observable<AccountResult> {
		const thisLabel = label
		return new Observable<AccountResult>((observer) => {
			axios.post(getURL(environment.backend.account.create), { label: thisLabel, password })
				.then((resp) => {
					if (resp.data.error === 0) {
						this.logger.info("createAccount SUCCESS", resp.data)
						observer.next({ account: new Account(thisLabel, resp.data.result.address) })
					} else {
						this.logger.error("createAccount FAILED", resp.data)
						observer.next({ error: `createAccount FAILED: ${resp.data.error}` })
					}
				})
				.catch((err) => {
					this.logger.error("createAccount ERROR", err)
					observer.next({ error: err.message })
				})
		})
	}

	importByMnemonic(label: string, mnemonic: string, password: string): Observable<AccountResult> {
		return new Observable<AccountResult>((observer) => {

		})
	}

	importByWIF(label: string, wif: string, password: string): Observable<AccountResult> {
		return new Observable<AccountResult>((observer) => {

		})
	}

	importByEncryptedPk(info: AccountInfo): Observable<AccountResult> {
		return new Observable<AccountResult>((observer) => {
			axios.post(getURL(environment.backend.account.importByEncryptedPk), info)
				.then((resp) => {
					if (resp.data.error === 0) {
						observer.next({
							account: new Account(info.label, info.address)
						})
					} else {
						this.logger.error('importByEncryptedPk FAILED', resp.data)
						observer.next({
							error: `importByEncryptedPk FAILED: ${resp.data.error}`
						})
					}
				})
				.catch((err) => {
					this.logger.error('importByEncryptedPk ERROR', err)
					observer.next({
						error: err.message
					})

				})

		})
	}


}
