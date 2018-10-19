import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import axios from 'axios'
import { getURL } from './utils'
import { environment } from '../environments/environment'
import { NGXLogger } from 'ngx-logger';
import { Contract, ContractMethodInfo, ContractAdminOntID, ContractRoleInfo } from './contract'

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
	initAdmin: boolean
}

export interface ContractResult {
	error?: string
}

export interface ListContractResult {
	error?: string
	contracts?: Contract[]
}

@Injectable({
	providedIn: 'root'
})
export class ContractService {

	static convertToContracts(anyContracts: any[]): Contract[] {
		const contracts  = new Array<Contract>()
		anyContracts.forEach((c) => {
			contracts.push(new Contract(
				c.script,
				c.name,
				c.version,
				c.description,
				c.author,
				c.email,
				c.abi,
				c.methods as ContractMethodInfo[],
				c.adminOntID as ContractAdminOntID,
				c.roles as ContractRoleInfo[]
			))
		})
		return contracts
	}

	constructor(private logger: NGXLogger) { }

	deploy(content: DeployContractContent): Observable<ContractResult> {
		return new Observable<ContractResult>((observer) => {
			axios
				.post(getURL(environment.backend.contract.deploy), content)
				.then((resp) => {
					if (resp.data.error === 0) {
						this.logger.info('deploy SUCCESS', resp.data)
						return true
					} else {
						const msg = `create FAILED: ${resp.data.error}`
						this.logger.error(msg)
						observer.next({ error: msg })
						return false
					}
				})
				.then((deployed) => {
					if (deployed) {
						if (content.initAdmin) {
							this.initAdmin(content.name, content.ontID.ontid, content.ontID.password)
								.subscribe((initAdminResult) => {
									if (initAdminResult.error) {
										observer.next({error: initAdminResult.error})
									} else {
										observer.next({})
									}
								})
						} else {
							observer.next({})
						}
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

	initAdmin(name: string, ontid: string, password: string): Observable<ContractResult> {
		return new Observable<ContractResult>((observer) => {
			axios
				.post(
					getURL(environment.backend.contract.initAdmin),
					{
						ontID: {
							ontid, password
						},
						name
					})
				.then((resp) => {
					if (resp.data.error === 0) {
						this.logger.info('initAdmin SUCCESS')
						observer.next({})
					} else {
						const msg = `initAdmin FAILED: ${resp.data.error}`
						this.logger.error(msg)
						observer.next({error: msg})
					}
				})
				.catch((err) => {
					this.logger.error('initAdmin ERROR', err)
					observer.next({error: err.message})
				})
		})
	}

	list(): Observable<ListContractResult> {
		return new Observable<ListContractResult>((observer) => {
			axios
				.get(getURL(environment.backend.contract.list))
				.then((resp) => {
					if (resp.data.error === 0) {
						observer.next({
							contracts: ContractService.convertToContracts(resp.data.result.contracts)
						})
					} else {
						const msg = `list FAILED: ${resp.data.error}`
						this.logger.error(msg)
						observer.next({error: msg})
					}
				})
				.catch((err) => {
					this.logger.error('list ERROR', err)
					observer.next({error: err.message})
				})
		})
	}

	addRole(name: string, roleName: string, ontid: string, password: string): Observable<ContractResult> {
		return new Observable<ContractResult>((observer) => {
			axios
				.post(
					getURL(environment.backend.contract.addRole),
					{
						ontID: {
							ontid, password
						},
						name,
						roleName
					})
				.then((resp) => {
					if (resp.data.error === 0) {
						this.logger.info('addRole SUCCESS')
						observer.next({})
					} else {
						const msg = `addRole FAILED: ${resp.data.error}`
						this.logger.error(msg)
						observer.next({error: msg})
					}
				})
				.catch((err) => {
					this.logger.error('addRole ERROR', err)
					observer.next({error: err.message})
				})
		})
	}

	addOntIDToRole(name: string, ontID: string, role: string, adminOntID: string, adminOntIDPassword: string): Observable<ContractResult> {
		return new Observable<ContractResult>((observer) => {
			axios
				.post(
					getURL(environment.backend.contract.addOntIDToRole),
					{
						ontID: {
							ontid: adminOntID,
							password: adminOntIDPassword
						},
						name,
						ontIDToAdd: ontID,
						roleName: role
					}
				)
				.then((resp) => {
					if (resp.data.error === 0) {
						this.logger.info('addOntIDToRole SUCCESS')
						observer.next({})
					} else {
						const msg = `addOntIDToRole FAILED: ${resp.data.error}`
						this.logger.error(msg)
						observer.next({error: msg})
					}
				})
				.catch((err) => {
					this.logger.error('addOntIDToRole', err)
					observer.next({error: err.message})
				})
		})
	}

	assignMethodToRole(name: string, methodName: string, roleName: string, adminOntID: string, adminOntIDPassword: string): Observable<ContractResult> {
		return new Observable<ContractResult>((observer) => {
			axios
				.post(
					getURL(environment.backend.contract.assignMethodToRole),
					{
						ontID: {
							ontid: adminOntID,
							password: adminOntIDPassword
						},
						name,
						methodName,
						roleName
					}
				)
				.then((resp) => {
					if (resp.data.error === 0) {
						this.logger.info('assignMethodToRole SUCCESS')
						observer.next({})
					} else {
						const msg = `assignMethodToRole FAILED: ${resp.data.error}`
						this.logger.error(msg)
						observer.next({error: msg})
					}
				})
				.catch((err) => {
					this.logger.error('assignMethodToRole ERROR', err)
					observer.next({error: err.message})
				})
		})
	}

}
