import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';;
import  { DomSanitizer }  from  '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'report';
  private m_domSanitizer: DomSanitizer;

  /**
  *   Constructor: preload SVG icons
	*/
  constructor(private p_domSanitizer: DomSanitizer, public p_matIconRegistry: MatIconRegistry) {
    this.m_domSanitizer = p_domSanitizer;
    this.p_matIconRegistry.addSvgIcon('thermometer-red', this.m_domSanitizer.bypassSecurityTrustResourceUrl('./assets/thermometer-red.svg'));
    this.p_matIconRegistry.addSvgIcon('drop-red', this.m_domSanitizer.bypassSecurityTrustResourceUrl('./assets/drop-red.svg'));
    this.p_matIconRegistry.addSvgIcon('thermometer-white', this.m_domSanitizer.bypassSecurityTrustResourceUrl('./assets/thermometer-white.svg'));
    this.p_matIconRegistry.addSvgIcon('drop-white', this.m_domSanitizer.bypassSecurityTrustResourceUrl('./assets/drop-white.svg'));
    this.p_matIconRegistry.addSvgIcon('partial-pressure-white', this.m_domSanitizer.bypassSecurityTrustResourceUrl('./assets/partial-pressure-white.svg'));
    this.p_matIconRegistry.addSvgIcon('partial-pressure-red', this.m_domSanitizer.bypassSecurityTrustResourceUrl('./assets/partial-pressure-red.svg'));
    this.p_matIconRegistry.addSvgIcon('dew-point-temperature-red', this.m_domSanitizer.bypassSecurityTrustResourceUrl('./assets/dew-point-temperature-red.svg'));
    this.p_matIconRegistry.addSvgIcon('dew-point-temperature-white', this.m_domSanitizer.bypassSecurityTrustResourceUrl('./assets/dew-point-temperature-white.svg'));
  }

  ngOnInit(): void {
  }
}
