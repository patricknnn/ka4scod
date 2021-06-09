import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsWzTableComponent } from './stats-wz-table.component';

describe('StatsWzTableComponent', () => {
  let component: StatsWzTableComponent;
  let fixture: ComponentFixture<StatsWzTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatsWzTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatsWzTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
