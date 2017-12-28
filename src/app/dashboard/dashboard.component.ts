import { Component, AfterViewInit, ViewContainerRef, ViewChild, ComponentRef } from '@angular/core';
import { DynamicChartFactoryService } from '../dynamic-chart-factory.service';

import { PieChartComponent } from '../chart/pie-chart/pie-chart.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit {

    chartConfig: any;

    @ViewChild('dynamic', { 
        read: ViewContainerRef 
    }) viewContainerRef: ViewContainerRef

    constructor( 
      private chartFactory: DynamicChartFactoryService
    ) { 
        this.chartConfig = {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: 'Browser market shares January, 2015 to May, 2015'
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                        style: {
                            color: 'black'
                        }
                    }
                }
            },
            series: [{
                name: 'Brands',
                colorByPoint: true,
                data: [{
                    name: 'IE',
                    y: 56.33
                }, {
                    name: 'Chrome',
                    y: 24.03,
                    sliced: true,
                    selected: true
                }, {
                    name: 'Firefox',
                    y: 10.38
                }, {
                    name: 'Safari',
                    y: 4.77
                }, {
                    name: 'Opera',
                    y: 0.91
                }, {
                    name: 'Other',
                    y: 0.2
                }]
            }]
        };

    }

    ngAfterViewInit() {
        const component: ComponentRef<PieChartComponent> = this.chartFactory.createComponentInHostView( PieChartComponent, this.viewContainerRef );
        component.instance.chartConfig = this.chartConfig;
        setTimeout(() => {
            component.destroy();
        }, 10000);
    }

}
