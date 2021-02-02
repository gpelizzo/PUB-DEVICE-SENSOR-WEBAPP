import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CDisplayClientsListComponent } from './display-clients-list.component';

describe('DisplayClientListComponent', () => {
  let component: CDisplayClientsListComponent;
  let fixture: ComponentFixture<CDisplayClientsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CDisplayClientsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CDisplayClientsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
