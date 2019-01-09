export interface ContractRoleInfo {
	role: string
	ontids: string[]
}

export interface ContractMethodInfo {
	name: string
	roles: string[]
}

export interface ContractAdminOntID {
	ontID: string
	keyNo: number
}

export interface ContractAccount {
	account: string
}

export class Contract {
	constructor(
		public script: string,
		public name: string,
		public version: string,
		public description: string,
		public author: string,
		public email: string,
		public abi: any,
		public methods?: ContractMethodInfo[],
		public adminOntID?: ContractAdminOntID,
		public adminAccount?: ContractAccount,
		public contractInfo?: any,
		public roles?: ContractRoleInfo[]
	) {}
}
