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

/**
* 	Manage and populate the client list with clients' name
*/
@Component({
  selector: 'app-display-clients-list',
  templateUrl: './display-clients-list.component.html',
  styleUrls: ['./display-clients-list.component.css']
})
export class CDisplayClientsListComponent implements OnInit {
  /*list of all clients*/
  public m_listClients: any = null;
 
  /*API request service*/
  private m_restService: CRestApiService;

  /*output events emitter*/
  @Output() evtRequestRefreshClientDevicesLastMeasures: EventEmitter<any> = new EventEmitter();
  @Output() evtChangeClient: EventEmitter<any> = new EventEmitter();

  /*input passed throught HTML*/
  @Input() api_client_id: string;

  /**
  *   Constructor: init API REST Service object
	*/
  constructor(p_restService: CRestApiService) {
    this.m_restService = p_restService;
  }

  /**
  *   Instance init: start by retreiving the list of all available clients
	*/
  ngOnInit(): void {
    this.m_restService.getClientsList().then((data: any) => {
      this.m_listClients = [];
      data.forEach((item: any) => {
        this.m_listClients.push(item);
      });
    }).catch((error: any) => {
      this.m_listClients = null;
      console.log('error: ' + error);
    });
  }

  /**
  *   Handler for event 'click' when user click on refresh icon in order to update clients list
  *   Event is propagate to main-container component by firing an event emitter 'evtRequestRefreshClientDevicesLastMeasures'
  * 
  *   params
  *       p_evt: NOT USED
  * 
  *   return
  *       NONE   
	*/
  public onRefresh(p_evt: any) {
    this.evtRequestRefreshClientDevicesLastMeasures.emit({});
  }

  /**
  *   Handler for event 'click' when user click on bar-graph icon in order to display charts
  *   of measures history
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
	*/
  public onChangeClient(p_evt: any) {
    this.evtChangeClient.emit({api_client_id: p_evt.value});
  }
}
