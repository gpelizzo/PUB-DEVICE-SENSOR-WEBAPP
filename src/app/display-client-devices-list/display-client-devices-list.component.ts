/**	This is free software: you can redistribute it and/or modify
*	it under the terms of the GNU General Public License as published by
*	the Free Software Foundation, either version 3 of the License, or
*	(at your option) any later version.
*
*	This software is distributed in the hope that it will be useful,
*	but WITHOUT ANY WARRANTY; without even the implied warranty of
*	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
*	GNU General Public License for more details.
*
*	You should have received a copy of the GNU General Public License
*	along with Foobar.  If not, see <https://www.gnu.org/licenses/>.
*
*
*	Author: Gilles PELIZZO
*	Date: February 2nd, 2021.
*/

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CRestApiService } from '../rest-api.service';
import * as moment from 'moment';

/**
* 	Display last measures into MAT-CARDS for all devices belonging to a client
*/
@Component({
  selector: 'app-display-client-devices-list',
  templateUrl: './display-client-devices-list.component.html',
  styleUrls: ['./display-client-devices-list.component.css']
})
export class CDisplayClientDevicesListComponent implements OnInit {
  
  /*API request service*/
  private m_restService: CRestApiService;
  /*devices measures list*/
  public m_listSensorMeasures: any = null;
  /*Current client API ID*/
  public m_strCurrentAPIClientID: string = ''; 
  
  /*input passed throught HTML*/
  @Input() api_client_id: string;

  /*output events emitter*/
  @Output() evtRequestDisplayDeviceMeasuresHistory: EventEmitter<any> = new EventEmitter();

  /**
  *   Constructor: init API REST Service object
	*/
  constructor(p_restService: CRestApiService) { 
    this.m_restService = p_restService;
  }

  /**
  *   Instance init: start by updating the Devices MAT-CARD list according to the API Client ID passed into HTML
	*/
  ngOnInit(): void {
    if (this.api_client_id !=='') {
      this.onUpdate({api_client_id: this.api_client_id});
    }
  }

  /**
  *   Retreive last measures for all devices belongig to a client, and 
  *   display the related MAT-CARDS.
  *   This function is called during int (cf ngOnInt) and directly from
  *   main-container when client changes or a refresh has been requested
  * 
  *   params
  *       p_evt: JSON containing client parameters
  *       {
  *         api_client_id: <API-CLIENT-ID>
  *       }
  * 
  *   return
  *       NONE   
	*/
  public onUpdate(p_evt: any) {
    if (p_evt.hasOwnProperty('api_client_id')) {
      this.m_strCurrentAPIClientID = p_evt.api_client_id;
    }

    if (this.m_strCurrentAPIClientID != '') {
      this.m_restService.getClientLastDevicesValues(this.m_strCurrentAPIClientID).then((data: any) => {
        this.m_listSensorMeasures = [];
        data.forEach((item: any) => {
          this.m_listSensorMeasures.push({
                          date: moment(Date.parse(item.date_time)).format('YYYY/MM/DD - HH:mm:ss'), 
                          temperature: parseFloat(item.temperature).toFixed(1).toString(), 
                          humidity: parseFloat(item.humidity).toFixed(1).toString(), 
                          partial_pressure: parseFloat(item.partial_pressure).toFixed(1).toString(), 
                          dew_point_temperature: parseFloat(item.dew_point_temperature).toFixed(1).toString(), 
                          device_name: item.name, 
                          device_addr: item.device_addr});
        });
      }).catch((error: any) => {
        console.log('error: ' + error);
      });
    }
  }

  /**
  *   Handler for event 'selectionChange' of the MAT-SELECT when user select a new client
  *   Event is propagate to main-container component by firing an event emitter 'evtRequestDisplayDeviceMeasuresHistory'
  * 
  *   params
  *       p_evt: JSON containing devices parameters
  *       {
  *         device_addr: <DEVICE-ADDRESS>
  *         device_name: <DEVICE-NAME>
  *       }
  * 
  *   return
  *       Event including a JSON with params
  *       {
  *         api_client_id: <API-CLIENT_ID>
  *         device_addr: <DEVICE_ADDRESS>
  *         device_name: <DEVICE_NAME>
  *       }   
	*/
  public onShowChartHistory(p_evt: any) {
    //fire event captured by main-container component
    this.evtRequestDisplayDeviceMeasuresHistory.emit({api_client_id: this.m_strCurrentAPIClientID, device_addr: p_evt.device_addr, device_name: p_evt.device_name});
  }
}
