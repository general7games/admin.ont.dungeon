import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { Account } from './account'
import axios from 'axios'
import { getURL } from './utils'
import { environment } from '../environments/environment'
import { PagingCursor } from './types'
import { Accounts } from './mock-accounts'
import { NGXLogger } from 'ngx-logger'


export type SearchType = 'label' | 'address'

export interface ListAccountResult {
	error?: string
	cursor?: PagingCursor
	accounts?: Account[]
}

export interface AccountResult {
	error?: string
	account?: Account
}


export interface RoleResult {
	error?: string
	role?: string
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
			converted.push(new Account(a.label, a.address, a.role))
		})
		return converted
	}

	constructor(private logger: NGXLogger) { }

	list(cursor?: PagingCursor): Observable<ListAccountResult> {
		return new Observable<ListAccountResult>((observer) => {
			axios
				.get(getURL(environment.backend.account.list), { params: cursor })
				.then((resp) => {
					if (resp.data.error === 0) {
						observer.next({
							cursor: new PagingCursor(resp.data.result.cursor.before, resp.data.result.cursor.after),
							accounts: AccountService.convertToAccounts(resp.data.result.accounts)
						})
					} else {
						const msg = `list FAILED: ${resp.data.error}`
						observer.next({
							error: msg
						})
						this.logger.error(msg)
					}
				})
				.catch((err) => {
					observer.next({
						error: err.message
					})
					this.logger.error('list ERROR', err)
				})
		})
	}

	create(label: string, password: string): Observable<AccountResult> {
		const thisLabel = label
		return new Observable<AccountResult>((observer) => {
			axios
				.post(getURL(environment.backend.account.create), { label: thisLabel, password })
				.then((resp) => {
					if (resp.data.error === 0) {
						this.logger.info("create SUCCESS", resp.data)
						observer.next({ account: new Account(thisLabel, resp.data.result.address) })
					} else {
						this.logger.error("create FAILED", resp.data)
						observer.next({ error: `create FAILED: ${resp.data.error}` })
					}
				})
				.catch((err) => {
					this.logger.error("create ERROR", err)
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
			axios
				.post(getURL(environment.backend.account.importByEncryptedPk), info)
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

	search(option: {
		content?: string,
		type?: SearchType,
		role?: 'root'
	}): Observable<ListAccountResult> {
		return new Observable<ListAccountResult>((observer) => {
			axios
				.get(getURL(environment.backend.account.search), { params: option })
				.then((resp) => {
					if (resp.data.error === 0) {
						observer.next({
							cursor: new PagingCursor(resp.data.result.cursor.before, resp.data.result.cursor.after),
							accounts: AccountService.convertToAccounts(resp.data.result.accounts)
						})
					} else {
						observer.next({
							error: `search FAILED: ${resp.data.error}`
						})
					}
				})
				.catch((err) => {
					this.logger.error('search ERROR', err)
				})
		})
	}

	setAsRoot(
		newRootAddress: string, passwordOfNewRoot: string,
		curRootAddress: string, passwordOfCurRoot: string
	): Observable<RoleResult> {
		return new Observable<RoleResult>((observer) => {
			axios
				.post(
					getURL(environment.backend.account.setAsRoot),
					{
						newRootAddress,
						passwordOfNewRoot,
						curRootAddress,
						passwordOfCurRoot
					}
				)
				.then((resp) => {
					if (resp.data.error === 0) {
						this.logger.info(`setAsRoot SUCCESS: ${newRootAddress} -> ${curRootAddress}`)
						observer.next({
							role: resp.data.result.role
						})
					} else {
						const msg = `setAsRoot FAILED: ${resp.data.error}`
						this.logger.error(msg)
						observer.next({
							error: msg
						})
					}
				})
				.catch((err) => {
					this.logger.error('setAsRoot ERROR', err)
					observer.next({
						error: err.message
					})
				})
		})
	}


}
