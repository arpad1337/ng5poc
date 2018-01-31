import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { ChartAbstractComponent } from '../chart-abstract/chart-abstract.component';

@Component({
  selector: 'chart-graph',
  templateUrl: '../chart-abstract/chart-abstract.component.html'
})
export class GraphComponent extends ChartAbstractComponent {

  constructor( elementRef: ElementRef ) {
    super( elementRef );
  }

  render() {
    
  }

}
