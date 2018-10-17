export interface ContractRoleInfo {
	role: string
	ontID: string
}

export interface ContractMethodInfo {
	name: string
	roles: string[]
}

export class Contract {
	constructor(
		public script: string,
		public name: string,
		public version: string,
		public description: string,
		public author: string,
		public email: string,
		public roles: ContractRoleInfo[],
		public methods: ContractMethodInfo[]
	) {}
}
