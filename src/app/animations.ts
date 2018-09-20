
import { state, transition, style, animate, trigger } from '@angular/animations'


export function makeTriggerHighlight(name, color) {
	return trigger(name, [
		state('start', style({
			opacity: 1,
			backgroundColor: color
		})),
		state('end', style({	})),
		transition('start => end', [
			animate('0.5s')
		])
	])
}