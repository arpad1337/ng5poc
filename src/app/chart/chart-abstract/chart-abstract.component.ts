import { Component, AfterContentInit, ElementRef, Input } from '@angular/core';
import { HighchartsRefService } from '../highcharts-ref.service';

export class ChartAbstractComponent implements AfterContentInit {

  protected _chartConfig: any; 
  public elementRef: ElementRef;

  constructor(
    elementRef: ElementRef
  ) {
    this.elementRef = elementRef;
  }

  ngAfterContentInit() {
    this.render();
  }

  @Input() set chartConfig( value: any ) {
    this._chartConfig = value;
    this.render();
  }

  get chartConfig() {
    return this._chartConfig;
  }

  render() {
    
  }

}
