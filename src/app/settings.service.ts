import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CSettingsService {

  private m_AppSettings: any;
  private m_http: HttpClient;

  constructor(l_http: HttpClient) { 
    this.m_http = l_http;
  }

  public load() {
    const l_HttpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json; charset=UTF-8',
          'Accept': 'application/json'
      })
    };

    return this.m_http.get('/assets/settings.json', l_HttpOptions).toPromise().then((p_data: any) => {
      this.m_AppSettings = p_data;
    }).catch((p_error: any) => {
      console.log(p_error);
    });
  }

  public getAPIUrlPrefix(): String {
    return this.m_AppSettings.api_url_prefix;
  }
}
