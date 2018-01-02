import { Component, AfterContentInit, ElementRef, Input } from '@angular/core';
import { HighchartsRefService } from '../highcharts-ref.service';

export class ChartAbstractComponent implements AfterContentInit {

  _chartConfig: any; 

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
    this.render();
  }

  @Input() set chartConfig( value: any ) {
    this._chartConfig = value;
    this.render();
  }

  render() {
    const element = this.elementRef.nativeElement;
    this.highchartsRef.lib.chart( element, this._chartConfig );
  }

}
