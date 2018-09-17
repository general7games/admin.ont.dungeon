
export const environment = {
	production: false,
	logLevel: {
		'<root>': {
			level: 'debug'
		}
	},
	backend: {
		root: 'http://localhost:3000',
		admin: {
			createOntID: '/admin/createOntID',
			listOntID: '/admin/listOntID',
			deployContract: '/admin/deployContract',
			migrateContract: '/admin/migrateContract',
			listAccount: '/admin/listAccount'
		},
		account: {
			create: '/account/create',
			decryptMnemonic: '/account/decryptMnemonic'
		}
	}
}
