import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { ChartAbstractComponent } from '../chart-abstract/chart-abstract.component';

import * as cyarbor from 'cytoscape-arbor';
import * as cytoscape from 'cytoscape';
import * as arbor from 'rpi-arbor';

cyarbor( cytoscape, arbor ); 

@Component({
  selector: 'chart-graph',
  templateUrl: '../chart-abstract/chart-abstract.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent extends ChartAbstractComponent {

  constructor( elementRef: ElementRef ) {
    super( elementRef );
  }

  render() {
    this.chartConfig.container = this.elementRef.nativeElement;
    cytoscape( this.chartConfig );
  }

}
