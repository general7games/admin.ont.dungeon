import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface ConfirmInputEntry {
	label: string
	type: string
	content: string
	required: boolean
	mark: string
}

export interface ConfirmContent {
	content: string
	input?: ConfirmInputEntry[]
}

@Component({
	selector: 'app-confirmdialog',
	templateUrl: './confirmdialog.component.html',
	styleUrls: ['./confirmdialog.component.css']
})
export class ConfirmdialogComponent implements OnInit {

	constructor(
		public dialogRef: MatDialogRef<ConfirmdialogComponent>,
		@Inject(MAT_DIALOG_DATA)
		public content: ConfirmContent
	) { }

	ngOnInit() {
	}

	onConfirmClicked() {
		this.dialogRef.close(this.content)
	}

	meetsRequirement() {
		if (this.content.input) {
			for (var i = 0; i < this.content.input.length; ++i) {
				const inp = this.content.input[i]
				if (inp.required) {
					if (!inp.content) {
						return false
					}
				}
			}
		}
		return true
	}

}
