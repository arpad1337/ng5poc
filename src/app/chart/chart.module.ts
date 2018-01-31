import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as Highcharts from 'highcharts';

import { HighchartsRefService } from './highcharts-ref.service';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { GraphComponent } from './graph/graph.component';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [{
    provide: HighchartsRefService,
    useFactory() {
      return HighchartsRefService.createRef( Highcharts );
    }
  }],
  declarations: [ PieChartComponent, GraphComponent ],
  entryComponents: [ PieChartComponent, GraphComponent ],
  exports: [
    PieChartComponent,
    GraphComponent
  ]
})
export class ChartModule {
  
}