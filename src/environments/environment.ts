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
		root: 'http://127.0.0.1:3000',
		admin: {
			createOntID: '/admin/createOntID',
			listOntID: '/admin/listOntID',
			deployContract: '/admin/deployContract',
			migrateContract: '/admin/migrateContract',
			listAccount: '/admin/listAccount',
		},
		ontid: {
			createAndSave: '/ontid/createAndSave',
			importAndSave: '/ontid/importAndSave'
		},
		account: {
			create: '/account/create',
			importByEncryptedPk: '/account/importByEncryptedPk',
			decryptMnemonic: '/account/decryptMnemonic',
			list: '/account/list',
			search: '/account/search',
			setAsRoot: '/account/setAsRoot'
		},
		asset: {
			transfer: '/asset/transfer',
			balance: '/asset/balance'
		}
	}
}
