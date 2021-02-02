import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CDisplayClientDevicesListComponent } from './display-client-devices-list/display-client-devices-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { CDisplayDeviceMeasuresHistoryComponent } from './display-device-measures-history/display-device-measures-history.component';

import { GoogleChartsModule } from 'angular-google-charts';
import { CMainContainerComponent } from './main-container/main-container.component';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { MAT_DATE_LOCALE } from '@angular/material/core';

import { CSettingsService } from './settings.service';
import { CDisplayClientsListComponent } from './display-clients-list/display-clients-list.component';

export function retreiveSettings(p_settings: CSettingsService) {
  return () => p_settings.load();
}

@NgModule({
  declarations: [
    AppComponent,
    CDisplayClientDevicesListComponent,
    CDisplayDeviceMeasuresHistoryComponent,
    CMainContainerComponent,
    CDisplayClientsListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    FlexLayoutModule,
    MatCardModule,
    GoogleChartsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    MatIconRegistry,
    {   
      provide: MAT_DATE_LOCALE,
      useValue: 'fr-FR'
    },
    {
      provide: APP_INITIALIZER,
      useFactory: retreiveSettings,
      deps: [CSettingsService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
