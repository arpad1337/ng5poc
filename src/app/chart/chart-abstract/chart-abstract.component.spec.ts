import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartAbstractComponent } from './chart-abstract.component';

describe('ChartAbstractComponent', () => {
  let component: ChartAbstractComponent;
  let fixture: ComponentFixture<ChartAbstractComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartAbstractComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartAbstractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
