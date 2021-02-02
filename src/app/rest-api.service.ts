import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subscription, from } from 'rxjs';
import { CSettingsService } from './settings.service';

import { map, catchError} from 'rxjs/operators';

//ng serve --host 0.0.0.0 --disableHostCheck true

const URL_CLIENT_GET_CLIENT_LAST_DEVICES_VALUES: string = 'last-sensors-values';
const URL_CLIENT_GET_CLIENTS_LIST: string = 'clients';
const URL_CLIENT_GET_CLIENT_RANGE_DEVICE_VALUES: string = 'range-device-values';

@Injectable({
  providedIn: 'root'
})
export class CRestApiService {
  private m_httpClient: HttpClient;
  private m_strURLPrefix: String;

  constructor(p_httpClient: HttpClient, p_settingsService: CSettingsService) { 
    this.m_httpClient = p_httpClient;

    this.m_strURLPrefix = p_settingsService.getAPIUrlPrefix();
  }

  private GET(p_strCommand: string, p_strToken?: string): Observable<any> {
    return this.m_httpClient.get(this.m_strURLPrefix + '/' + p_strCommand, this.buildHeader(p_strToken ? p_strToken: ''));
  }

  private buildHeader(p_strToken: string) {
    const l_HttpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin' : '*',
            'Authorization': (p_strToken != '') ? p_strToken : ''
        })
    };

    return l_HttpOptions;
  }

  public getClientLastDevicesValues(p_clientId: string) {
    return new Promise((resolve: any, reject: any) => {
      this.GET(URL_CLIENT_GET_CLIENT_LAST_DEVICES_VALUES + '?APIclientID=' + p_clientId).subscribe((data: any) => {
        resolve(data.data);
      }), ((error: any) => {
        reject(error);
      });
    });
  }

  public getClientsList() {
    return new Promise((resolve: any, reject: any) => {
      this.GET(URL_CLIENT_GET_CLIENTS_LIST).subscribe((data: any) => {
        resolve(data.data);
      }), ((error: any) => {
        reject(error);
      });
    });
  }

  public getClientRangeDeviceValues(p_strAPIClientId: string, p_strDeviceAddr: string, p_strDateFrom: string, p_strDateTo: string) {
    return new Promise((resolve: any, reject: any) => {
      this.GET(URL_CLIENT_GET_CLIENT_RANGE_DEVICE_VALUES + '?APIclientID=' + p_strAPIClientId + '&deviceAddr=' + p_strDeviceAddr + '&dateFrom=' + p_strDateFrom + '&dateTo=' + p_strDateTo).subscribe((data: any) => {
        resolve(data.data);
      }), ((error: any) => {
        console.log('error: ' + error);
        reject(error);
      });
    });
  }
}
