import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as Highcharts from 'highcharts';

import { HighchartsRefService } from './highcharts-ref.service';
import { PieChartComponent } from './pie-chart/pie-chart.component';

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
  declarations: [ PieChartComponent ],
  entryComponents: [ PieChartComponent ],  
  exports: [
    PieChartComponent
  ]
})
export class ChartModule {
  
}
