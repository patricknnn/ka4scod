import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KillsTableComponent } from './kills-table.component';

describe('KillsTableComponent', () => {
  let component: KillsTableComponent;
  let fixture: ComponentFixture<KillsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KillsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KillsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
