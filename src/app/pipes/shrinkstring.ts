import { Pipe, PipeTransform } from '@angular/core'

@Pipe({name: 'shrinkString'})
export class ShrinkStringPipe implements PipeTransform {
	transform(value: string, length: number) {
		const len = Math.min(value.length, length - 3)
		let ret = value.substr(0, len)
		if (len < value.length) {
			ret = ret + '...'
		}
		return ret
	}
}