import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CDisplayDeviceMeasuresHistoryComponent } from './display-device-measures-history.component';

describe('CDisplayDeviceMeasuresHistoryComponent', () => {
  let component: CDisplayDeviceMeasuresHistoryComponent;
  let fixture: ComponentFixture<CDisplayDeviceMeasuresHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CDisplayDeviceMeasuresHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CDisplayDeviceMeasuresHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
