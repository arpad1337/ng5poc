import { Component, AfterContentInit, ElementRef, Input } from '@angular/core';
import { HighchartsRefService } from '../highcharts-ref.service';

export class ChartAbstractComponent implements AfterContentInit {

  @Input() chartConfig: any; 

  private highchartsRef: HighchartsRefService;
  private elementRef: ElementRef;

  constructor(
    highchartsRef: HighchartsRefService,
    elementRef: ElementRef
  ) {
    this.highchartsRef = highchartsRef;
    this.elementRef = elementRef;
  }

  ngAfterContentInit() {
    const element = this.elementRef.nativeElement;
    this.highchartsRef.lib.chart( element, this.chartConfig );
  }

}
