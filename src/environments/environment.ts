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
		ontid: {
			createAndSave: '/ontid/createAndSave',
			importAndSave: '/ontid/importAndSave',
			list: '/ontid/list'
		},
		contract: {
			list: '/contract/list',
			deploy: '/contract/deploy',
			migrate: '/contract/migrate',
			destroy: '/contract/destroy',
			initAdmin: '/contract/initAdmin',
			addRole: '/contract/addRole',
			addOntIDToRole: '/contract/addOntIDToRole'
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
