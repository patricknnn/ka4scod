import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RankBpCardComponent } from './rank-bp-card.component';

describe('RankBpCardComponent', () => {
  let component: RankBpCardComponent;
  let fixture: ComponentFixture<RankBpCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RankBpCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RankBpCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
