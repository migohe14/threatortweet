import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartsModule } from 'ng2-charts';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CustomersComponent } from './pages/customers/customers.component';
import { BarchartComponent } from './components/charts/barchart/barchart.component';
import { DoughnutchartComponent } from './components/charts/doughnutchart/doughnutchart.component';
import { RadarchartComponent } from './components/charts/radarchart/radarchart.component';
import { PiechartComponent } from './components/charts/piechart/piechart.component';
import { NotificationsComponent } from './pages/notifications/notifications.component';
import { ReactiveFormsModule } from '@angular/forms';
import { environment } from '../environments/environment';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { LinechartComponent } from './components/charts/linechart/linechart.component';
import { BubblechartComponent } from './components/charts/bubblechart/bubblechart.component';
import { NgxSpinnerModule } from "ngx-spinner";
const config: SocketIoConfig = { url: environment.socketServerUrl, options: {} };


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    DashboardComponent,
    CustomersComponent,
    BarchartComponent,
    DoughnutchartComponent,
    RadarchartComponent,
    PiechartComponent,
    NotificationsComponent,
    LinechartComponent,
    BubblechartComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ChartsModule,
    BrowserAnimationsModule, // required animations module
    CommonModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    SocketIoModule.forRoot(config)
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
