import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CDisplayClientDevicesListComponent } from './display-client-devices-list.component';

describe('GetSensorValuesComponent', () => {
  let component: CDisplayClientDevicesListComponent;
  let fixture: ComponentFixture<CDisplayClientDevicesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CDisplayClientDevicesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CDisplayClientDevicesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
