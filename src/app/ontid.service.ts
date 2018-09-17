import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'

import { OntID } from './ontid'

@Injectable({
  providedIn: 'root'
})
export class OntidService {

  constructor() { }

  getOntIDs(): Observable<OntID[]> {
	const ontIDs = new Array<OntID>()
	return of(ontIDs)
  }
}
