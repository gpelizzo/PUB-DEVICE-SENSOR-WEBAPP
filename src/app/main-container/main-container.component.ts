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

import { Component, OnInit, ViewChild } from '@angular/core';
import { CDisplayClientDevicesListComponent } from '../display-client-devices-list/display-client-devices-list.component';

/**
* 	Because this web-app intends to emulate a mobile-app, I've managed in order
*   simplify the navigation. This container contains the 3 components (display-client-device-list,
*   display clients-list and display-device-measures-history) with are switch-displayed according to
*   to the value of m_bShowChartHistory
*/
@Component({
  selector: 'app-main-container',
  templateUrl: './main-container.component.html',
  styleUrls: ['./main-container.component.css']
})
export class CMainContainerComponent implements OnInit {
  /*true: only display-device-measures-history is displayed, otherwise it's hidden and the 2 other components are displayed*/
  public m_bShowChartHistory: boolean = false;

  /*current client and device params*/
  public m_strCurrentAPIClientID: string = ''; 
  public m_strCurrentDeviceAddr: string;
  public m_strCurrentDeviceName: string;

  @ViewChild(CDisplayClientDevicesListComponent)
  private m_diplayClientDeviceListChildComponent: CDisplayClientDevicesListComponent;

  /**
  *   Constructor: 
	*/
  constructor() {
  }

  /**
  *   Instance init: 
	*/
  ngOnInit(): void {
  }

  /**
  *   Handler for event 'evtRequestDisplayDeviceMeasuresHistory' sent by display-client-devices-list components
  *   when user click on the bar-graph icon on the bottom-right of MAT-CARD for devices;
  *   Changes the value of m_bShowChartHistory, show display-device-measures-history and hide display-client-device-list
  *   and display clients-list
  * 
  *   params
  *       p_evt: JSON containing devices parameters
  *       {
  *         api_client_id: <API-CLIENT-ID>
  *         device_addr: <DEVICE-ADDRESS>
  *         device_name: <DEVICE-NAME>
  *       }
  * 
  *   return
  *       NONE   
	*/
  public onRequestDisplayDeviceHistory(p_evt: any) {
    this.m_strCurrentAPIClientID = p_evt.api_client_id;
    this.m_strCurrentDeviceAddr = p_evt.device_addr;
    this.m_strCurrentDeviceName = p_evt.device_name;
    this.m_bShowChartHistory = true;
  }

  /**
  *   Handler for event 'evtRequestClose' sent by ddisplay-device-measures-history components
  *   when user click on close icon on the top-right of the chart;
  *   Changes the value of m_bShowChartHistory, hide display-device-measures-history and show display-client-device-list
  *   and display clients-list
  * 
  *   params
  *       NONE
  * 
  *   return
  *       NONE   
	*/
  public onRequestClose() {
    this.m_bShowChartHistory = false;
  }

  /**
  *   Handler for event 'evtRequestRefreshClientDevicesLastMeasures' sent by display-clients-list components
  *   when user click on refresh icon on the right of clients list;
  *   Direct action into the display-device-measures-history instance in order to request the last measures and
  *   print-out into the MAT-CARDS
  * 
  *   params
  *       p_evt: JSON containing devices parameters
  *       {
  *         api_client_id: <API-CLIENT-ID>
  *       }
  * 
  *   return
  *       NONE   
	*/
  public onRefreshClientDevicesLastMeasures(p_evt: any) {
      this.m_diplayClientDeviceListChildComponent.onUpdate(p_evt);
  }
  
  /**
  *   Handler for event 'evtChangeClient' sent by display-clients-list components
  *   when user select a nex client into the client list;
  *   Direct action into the display-device-measures-history instance in order to request the last measures
  *   of the new client and  print-out into the MAT-CARDS
  * 
  *   params
  *       p_evt: JSON containing devices parameters
  *       {
  *         api_client_id: <API-CLIENT-ID>
  *       }
  * 
  *   return
  *       NONE   
	*/
  public onChangeClient(p_evt: any) {
    this.m_diplayClientDeviceListChildComponent.onUpdate(p_evt);
  }
}
