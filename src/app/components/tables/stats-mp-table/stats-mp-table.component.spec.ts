import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsMpTableComponent } from './stats-mp-table.component';

describe('StatsMpTableComponent', () => {
  let component: StatsMpTableComponent;
  let fixture: ComponentFixture<StatsMpTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatsMpTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatsMpTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
