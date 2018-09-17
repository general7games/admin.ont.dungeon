
export const environment = {
	production: true,
	logLevel: {
		'<root>': {
			level: 'debug'
		}
	},
	backend: {
		root: 'http://localhost:3000',
		admin: {
			createOntID: '/admin/createOntID',
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
