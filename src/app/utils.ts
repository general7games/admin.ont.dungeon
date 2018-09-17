import { environment } from '../environments/environment'

export function getURL(path) {
	return environment.backend.root + path
}
