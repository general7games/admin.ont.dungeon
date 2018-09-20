import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { MatGridListModule, MatCardModule, MatMenuModule, MatIconModule, MatButtonModule, MatToolbarModule, MatSidenavModule, MatListModule, MatSelectModule, MatTabsModule, MatExpansionModule, MatDialogModule } from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout'
import { LoggerModule, NgxLoggerLevel, NGXLogger } from 'ngx-logger'
import axios from 'axios'

import { AppComponent } from './app.component'
import { AccountsComponent } from './accounts/accounts.component'
import { OntidsComponent } from './ontids/ontids.component'
import { DashboardComponent } from './dashboard/dashboard.component'
import { NavComponent } from './nav/nav.component'
import { LabelComponent } from './label/label.component'
import { ContractsComponent } from './contracts/contracts.component'
import { environment } from '../environments/environment'
import { OntidformComponent } from './ontidform/ontidform.component'
import { FormsModule } from '@angular/forms';
import { AccountformComponent } from './accountform/accountform.component';
import { AccountentryComponent } from './accountentry/accountentry.component';
import { TransferdialogComponent } from './transferdialog/transferdialog.component';

@NgModule({
  declarations: [
    AppComponent,
	AccountsComponent,
	OntidsComponent,
    DashboardComponent,
    NavComponent,
    LabelComponent,
    ContractsComponent,
    OntidformComponent,
    AccountformComponent,
    AccountentryComponent,
    TransferdialogComponent,
  ],
  imports: [
	BrowserModule,
	BrowserAnimationsModule,
	MatButtonModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
	MatListModule,
	MatSelectModule,
	MatTabsModule,
	MatDialogModule,
	FormsModule,
	MatExpansionModule,
	LoggerModule.forRoot({
		level: environment.logLevel.root.level,
		serverLogLevel: environment.logLevel.root.serverLogLevel
	})
  ],
  providers: [NGXLogger],
  entryComponents: [
	  AccountsComponent,
	  DashboardComponent,
	  OntidsComponent,
	  LabelComponent,
	  ContractsComponent,
	  TransferdialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

	constructor(private logger: NGXLogger) {
		axios.interceptors.request.use((request) => {
			this.logger.info(`[axios] ${request.method.toUpperCase()} ${request.url}`)
			return request
		})
		axios.interceptors.response.use((response) => {
			this.logger.info(`[axios] response ${response.status} payload: ${JSON.stringify(response.data)}`)
			return response
		})
	}
 }
