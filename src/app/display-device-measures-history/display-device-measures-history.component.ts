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
import { ChartType } from 'angular-google-charts';
import { FormControl } from '@angular/forms';
import { MAT_DATE_FORMATS } from '@angular/material/core';

export const GLOBAL_DATE_FORMATS = {
  parse: {
    dateInput: 'DD-MM-YYYY',
  },
  display: {
    dateInput: 'MMM DD, YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  },
}; 

/**
* 	Manage measures history display into Google Charts (cf https://github.com/FERNman/angular-google-charts)
*/
@Component({
  selector: 'app-display-device-measures-history',
  templateUrl: './display-device-measures-history.component.html',
  styleUrls: ['./display-device-measures-history.component.css'],
  providers: [
    // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
    // `MatMomentDateModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
    { provide: MAT_DATE_FORMATS, useValue: GLOBAL_DATE_FORMATS }
  ],
})
export class CDisplayDeviceMeasuresHistoryComponent implements OnInit {
  /*API request service*/
  private m_restService: CRestApiService;
  
  /*toggle boolean to manage buton-icons status (category of measures to display, e.g. Temperature, Humidity, etc.) and 
  display related measures*/
  public m_bDisplayTemperature = false;
  public m_bDisplayHumidity = false;
  public m_bDisplayPartialPressure = false;
  public m_bDisplayDewPointTemperature = false;
  
  /*array of raw data retreived from API*/
  private m_rawData: any;
  /*array of sorted data provided to Google Chart*/
  public m_googleChartData: any = {};
  
  /*Date picker in order to select a day-range of measures to retreive and display*/
  public m_datePickerForm: FormControl;

  /*enable or disable the button next inceasing the day-range*/
  public m_bEnableButtonDateNext: boolean = false;

  /*type/category of measures, e.g.: Temperature, Humidity, Partial pressure and dew point temperature
  NOT USED yet*/
  public m_strMeasureType: String;

  /*input passed throught HTML*/
  @Input() api_client_id: string;
  @Input() device_addr: string;
  @Input() device_name: string;

  /*output events emitter*/
  @Output() evtRequestClose: EventEmitter<any> = new EventEmitter();

  /**
  *   Constructor: init API REST Service object
	*/
  constructor(p_restService: CRestApiService) { 
    this.m_restService = p_restService;
  }

  /**
  *   Instance init: start by initialized variables and retreiving the current day measures
	*/
  ngOnInit(): void {

    /*by default, display Temperature measures*/
    this.m_bDisplayTemperature = true;
    this.m_strMeasureType = 'Temperature';

    this.m_googleChartData = {};
    this.m_googleChartData.data = [];
    this.m_rawData = [];
    this.m_googleChartData.type = ChartType.LineChart;
    this.m_datePickerForm = new FormControl(new Date());
    
    /*subscribe to date-picker change in order to retreive new date-range measures*/
    this.m_datePickerForm.valueChanges.subscribe((p_date: any) => {
      this.changeDateRange(p_date);
    });

    /* retreive and display current day measures*/
    this.retreiveDeviceValues(moment(Date.now()).format('YYYY-MM-DD 00:00:00'), moment(Date.now()).format('YYYY-MM-DD 23:59:59'));
  }

  /**
  *   Retreive and display device's measures from a date range
  * 
  *   params
  *       p_strDateFrom: date from
  *       p_strDateTo: date to
  * 
  *   return
  *       NONE   
	*/
  private retreiveDeviceValues(p_strDateFrom: string, p_strDateTo: string) {
    /*retreive measures from API*/
    this.m_restService.getClientRangeDeviceValues(this.api_client_id, this.device_addr, p_strDateFrom, p_strDateTo).then((data: any) => {
      this.m_rawData = data;
      /*display measures into a Google chart according to the requested category of measures*/
      this.displayMeasures();
    }).catch((error: any) => {
      console.log('error: ' + error);
    });
  }

  /**
  *   Diplay measures from a date range: sort data from m_rawData array according to the category od measures to display
  * 
  *   params
  *       NONE
  * 
  *   return
  *       NONE   
	*/
  private displayMeasures() {
    this.m_googleChartData.data = [];

    /*extract data from m_rawData and populate m_googleChartData with requested and formatted measures*/
    this.m_rawData.forEach((item: any) => {
      if (this.m_bDisplayTemperature) {
        this.m_googleChartData.data.push([{v: new Date(item.date_time), f: moment(Date.parse(item.date_time)).format('HH:mm')}, {v: parseFloat(item.temperature), f: parseFloat(item.temperature) + '°'}]);
      } else {
        if (this.m_bDisplayHumidity) {
          this.m_googleChartData.data.push([{v: new Date(item.date_time), f: moment(Date.parse(item.date_time)).format('HH:mm')}, {v: parseFloat(item.humidity), f: parseFloat(item.humidity) + '%'}]);
        } else {
          if (this.m_bDisplayPartialPressure) {
            this.m_googleChartData.data.push([{v: new Date(item.date_time), f: moment(Date.parse(item.date_time)).format('HH:mm')}, {v: parseFloat(item.partial_pressure), f: parseFloat(item.partial_pressure) + 'mmHg'}]);
          } else {
            if (this.m_bDisplayDewPointTemperature) {
              this.m_googleChartData.data.push([{v: new Date(item.date_time), f: moment(Date.parse(item.date_time)).format('HH:mm')}, {v: parseFloat(item.dew_point_temperature), f: parseFloat(item.dew_point_temperature) + '°'}]);
            }
          }
        }
      }

      /*update m_googleChartData with chart-display parameters*/ 
      this.m_googleChartData.columns = [{type: 'datetime'}, {type: 'number'}];
      if (this.m_bDisplayTemperature) {
        this.m_googleChartData.options = {colors: ['#a8323c'], legend: 'none', vAxis: {format: '#°'}, 'chartArea': {top:'5', 'width': '90%', 'height': '80%'}, hAxis: {format: 'HH:mm'}}; 
      } else {
        if (this.m_bDisplayHumidity) {
          this.m_googleChartData.options = {colors: ['#3a499e'], legend: 'none', vAxis: {format: '#\'%'}, 'chartArea': {top:'5', 'width': '90%', 'height': '80%'}, hAxis: {format: 'HH:mm'}}; 
        } else {
          if (this.m_bDisplayPartialPressure) {
            this.m_googleChartData.options = {colors: ['#3a499e'], legend: 'none', vAxis: {format: '#\'mmHg'}, 'chartArea': {top:'5', 'width': '90%', 'height': '80%'}, hAxis: {format: 'HH:mm'}}; 
          } else {
            if (this.m_bDisplayDewPointTemperature) {
              this.m_googleChartData.options = {colors: ['#3a499e'], legend: 'none', vAxis: {format: '#\'°'}, 'chartArea': {top:'5', 'width': '90%', 'height': '80%'}, hAxis: {format: 'HH:mm'}}; 
            }
          }
        }
      }
    });
  }

  /**
  *   Handler for event 'click' when user click on one of the 4 icons concerning the category to display: temperature, humidity, 
  *   partial pressure and dew point temperature
  *   It also an handler for date picker change (previous and next button) and close button, which event is Event is propagate to 
  *   main-container component by firing an event emitter 'evtRequestClose'
  * 
  *   params
  *       p_strValue: <name/ID of the button>
  * 
  *   return
  *     NONE
	*/
  public onClickButton(p_strValue: string) {
    switch (p_strValue) {
      case 'SHOW_TEMPERATURE':
        this.m_bDisplayTemperature = true;
        this.m_bDisplayHumidity = false;
        this.m_bDisplayPartialPressure = false;
        this.m_bDisplayDewPointTemperature = false;
        
        this.m_strMeasureType = 'Temperature';

        this.displayMeasures();
        break;

      case 'SHOW_HUMIDITY':
        this.m_bDisplayTemperature = false;
        this.m_bDisplayHumidity = true;
        this.m_bDisplayPartialPressure = false;
        this.m_bDisplayDewPointTemperature = false;

        this.m_strMeasureType = 'Humidity';

        this.displayMeasures();
        break;

      case 'SHOW_PARTIAL_PRESSURE':
        this.m_bDisplayTemperature = false;
        this.m_bDisplayHumidity = false;
        this.m_bDisplayPartialPressure = true;
        this.m_bDisplayDewPointTemperature = false;

        this.m_strMeasureType = 'Partial Pressure';

        this.displayMeasures();
        break;

      case 'SHOW_DEW_POINT_TEMPERATURE':
        this.m_bDisplayTemperature = false;
        this.m_bDisplayHumidity = false;
        this.m_bDisplayPartialPressure = false;
        this.m_bDisplayDewPointTemperature = true;

        this.m_strMeasureType = 'Dew Point Temperature';

        this.displayMeasures();
        break;

      case 'CLOSE':
        this.evtRequestClose.emit({client_id: this.api_client_id, device_id: this.device_addr});
        break;

      case 'DATE_PREVIOUS':
        this.m_datePickerForm.setValue(moment(Date.parse(this.m_datePickerForm.value)).add(-1, 'days').format('YYYY-MM-DD'), {emitEvent: true});
        break;

      case 'DATE_NEXT':
        this.m_datePickerForm.setValue(moment(Date.parse(this.m_datePickerForm.value)).add(1, 'days').format('YYYY-MM-DD'), {emitEvent: true});
        break;
    }
  }

  /**
  *   called by m_datePickerForm.valueChanges subscriber when user change the date into the date-picker
  *  
  *   params
  *       p_date: <new day-date to display the measures>
  * 
  *   return
  *       NONE   
	*/
  private changeDateRange(p_date: any) {
      
    this.retreiveDeviceValues(moment(p_date).format('YYYY-MM-DD 00:00:00'), moment(p_date).format('YYYY-MM-DD 23:59:59'));
    if (moment(p_date).isBefore(Date.now(), 'day')) {
      this.m_bEnableButtonDateNext = true;
    } else {
      this.m_bEnableButtonDateNext = false;
    }
  }
}
