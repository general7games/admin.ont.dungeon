import { Component, ViewChild, ViewContainerRef, ComponentFactoryResolver, OnInit } from '@angular/core'
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { LabelComponent } from '../label/label.component'

@Component({
	selector: 'app-nav',
	templateUrl: './nav.component.html',
	styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

	@ViewChild('componentContainer', {read: ViewContainerRef})
	componentContainerRef: ViewContainerRef

	@ViewChild('componentName', {read: ViewContainerRef})
	componentNameRef: ViewContainerRef

	currentComponent: string

	navItems = {
		dashboard: {},
		ontids: {},
		accounts: {},
		contracts: {}
	}

	isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
		.pipe(
			map(result => result.matches)
		);

	constructor(
		private breakpointObserver: BreakpointObserver,
		private componentFactoryResolver: ComponentFactoryResolver
	) {
		// empty
	}

	navItemKeys(): string[] {
		const keys = new Array<string>()
		for (let key in this.navItems) {
			keys.push(key)
		}
		return keys
	}

	async ngOnInit() {
		for (let key in this.navItems) {
			const value = this.navItems[key]
			value.component = await import(`../${key}/${key}.component`)
			value.title = value.component.thisComponent.title
		}
		this.changeViewingItem('dashboard')
	}

	changeViewingItem(name: string) {
		if (this.currentComponent === name) {
			return
		}
		const component = this.navItems[name].component
		if (!component) {
			return
		}
		const factory = this.componentFactoryResolver.resolveComponentFactory(component.thisComponent)
		this.componentContainerRef.clear()
		const ref = this.componentContainerRef.createComponent(factory)
		ref.changeDetectorRef.detectChanges()

		this.componentNameRef.clear()
		const labelFactory = this.componentFactoryResolver.resolveComponentFactory(LabelComponent)
		const labelRef = this.componentNameRef.createComponent(labelFactory)
		labelRef.instance.label = component.thisComponent.title
		labelRef.changeDetectorRef.detectChanges()

		this.currentComponent = name
	}

}
