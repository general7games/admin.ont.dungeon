import { NgxLoggerLevel } from 'ngx-logger'

export const environment = {
	production: false,
	logLevel: {
		root: {
			level: NgxLoggerLevel.DEBUG,
			serverLogLevel: NgxLoggerLevel.INFO
		}
	},
	backend: {
		root: 'http://localhost:3000',
		admin: {
			createOntID: '/admin/createOntID',
			listOntID: '/admin/listOntID',
			deployContract: '/admin/deployContract',
			migrateContract: '/admin/migrateContract',
			listAccount: '/admin/listAccount',
			init: 'admin/init'
		},
		account: {
			create: '/account/create',
			decryptMnemonic: '/account/decryptMnemonic'
		}
	}
}
