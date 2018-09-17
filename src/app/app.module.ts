import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppComponent } from './app.component'
import { AccountsComponent } from './accounts/accounts.component'
import { OntidsComponent } from './ontids/ontids.component'
import { DashboardComponent } from './dashboard/dashboard.component'
import { NavComponent } from './nav/nav.component'

import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { MatGridListModule, MatCardModule, MatMenuModule, MatIconModule, MatButtonModule, MatToolbarModule, MatSidenavModule, MatListModule } from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';
import { LabelComponent } from './label/label.component';
import { ContractsComponent } from './contracts/contracts.component'

@NgModule({
  declarations: [
    AppComponent,
	AccountsComponent,
	OntidsComponent,
    DashboardComponent,
    NavComponent,
    LabelComponent,
    ContractsComponent
  ],
  imports: [
	BrowserModule,
	BrowserAnimationsModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule
  ],
  providers: [],
  entryComponents: [
	  AccountsComponent,
	  DashboardComponent,
	  OntidsComponent,
	  LabelComponent,
	  ContractsComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
