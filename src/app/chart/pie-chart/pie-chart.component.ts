import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { ChartAbstractComponent } from '../chart-abstract/chart-abstract.component';
import { HighchartsRefService } from '../highcharts-ref.service';

@Component({
  selector: 'chart-pie-chart',
  templateUrl: '../chart-abstract/chart-abstract.component.html'
})
export class PieChartComponent extends ChartAbstractComponent {

  protected highchartsRef: HighchartsRefService;

  constructor(
    highchartsRef: HighchartsRefService,
    elementRef: ElementRef
  ) {
    super( elementRef );
    this.highchartsRef = highchartsRef;
  }

  render() {
    const element = this.elementRef.nativeElement;
    this.highchartsRef.lib.chart( element, this.chartConfig );
  }

}
