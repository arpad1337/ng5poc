import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ElementRef } from '@angular/core';

import { ChartAbstractComponent } from './chart-abstract.component';

describe('ChartAbstractComponent', () => {
  let component: ChartAbstractComponent;
  let fixture: ComponentFixture<ChartAbstractComponent>;

  let dummyElementRef = {};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartAbstractComponent ],
      providers: [{
        provide: ElementRef,
        useValue: dummyElementRef
      }]
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

  it('should call render on config change', () => {
    component.render = jasmine.createSpy('renderSpy');
    component.chartConfig = 1;
    expect(component.render).toHaveBeenCalled();
  });

  it('should call render on contentInit', () => {
    component.render = jasmine.createSpy('renderSpy');
    component.ngAfterContentInit();
    expect(component.render).toHaveBeenCalled();
  });
});
