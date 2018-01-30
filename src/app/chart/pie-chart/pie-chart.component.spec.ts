import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ElementRef } from '@angular/core';

import { PieChartComponent } from './pie-chart.component';
import { HighchartsRefService } from '../highcharts-ref.service';

describe('PieChartComponent', () => {
  let component: PieChartComponent;
  let fixture: ComponentFixture<PieChartComponent>;

  let dummyElementRef = {};
  let highchartsRefServiceMock = {
    lib: {
      chart: jasmine.createSpy('HighchartsrefRefService#lib#chart')
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PieChartComponent ],
      providers: [
        {
          provide: ElementRef,
          useValue: dummyElementRef
        },
        {
          provide: HighchartsRefService,
          useValue: highchartsRefServiceMock
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call HighchartsRefService lib chart with elementref and config on render', () => {
    let dummyChartConfig = {};
    component.chartConfig = dummyChartConfig;
    expect(highchartsRefServiceMock.lib.chart).toHaveBeenCalled();
    expect(highchartsRefServiceMock.lib.chart).toHaveBeenCalledWith([ dummyElementRef, dummyChartConfig ]);
  });
});
