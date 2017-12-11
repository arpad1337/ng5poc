import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { ChartAbstractComponent } from '../chart-abstract/chart-abstract.component';
import { HighchartsRefService } from '../highcharts-ref.service';

@Component({
  selector: 'chart-pie-chart',
  templateUrl: '../chart-abstract/chart-abstract.component.html'
})
export class PieChartComponent extends ChartAbstractComponent {

  constructor(
    highchartsRef: HighchartsRefService,
    elementRef: ElementRef
  ) {
    super( highchartsRef, elementRef );
  }

  ngAfterContentInit() {
    console.log('View rendered');
    super.ngAfterContentInit();
  }

}
