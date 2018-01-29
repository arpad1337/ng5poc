import { Component, AfterViewInit, ViewContainerRef, ViewChild, ComponentRef } from '@angular/core';
import { DynamicChartFactoryService } from '../dynamic-chart-factory.service';
import { ModalService, ModalEvent, ModalEventKey } from '../modal/modal.service';

import { PieChartComponent } from '../chart/pie-chart/pie-chart.component';

import { Debounce } from '../app.helper';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit {

    chartConfig: any;
    data: Array<any>;

    @ViewChild('dynamic', { 
        read: ViewContainerRef
    }) viewContainerRef: ViewContainerRef

    constructor( 
      private chartFactory: DynamicChartFactoryService,
      private modalService: ModalService
    ) { 
        this.data = [{
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
        }];
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
                data: this.data
            }]
        };

    }

    ngAfterViewInit() {
        const component: ComponentRef<PieChartComponent> = this.chartFactory.createComponentInHostView( PieChartComponent, this.viewContainerRef );
        component.instance.chartConfig = this.chartConfig;
        console.log(this.chartConfig);
        const component2 = this.chartFactory.createComponentInHostView( PieChartComponent, this.viewContainerRef );
        component2.instance.chartConfig = this.chartConfig;
        setTimeout(() => {
            this.destroyComponent( component2 );

        }, 5000)
        this.changeConfig( component );
    }

    @Debounce( 10000 )
    changeConfig( component: ComponentRef<any> ) {
        this.data = this.data.map((row) => {
            if( row.name == 'IE' ) {
                row.y -= 10;
            }
            if( row.name == 'Chrome' ) {
                row.y += 10;
            } 
            return row;
        });
        this.chartConfig.series.data = this.data;
        component.instance.chartConfig = this.chartConfig;
        this.destroyComponent( component );
    }

    @Debounce( 10000 )
    destroyComponent( component: ComponentRef<any> ) {
        component.destroy();
    }


    modalCount = 1;
    showModal() {
        const viewModel = this.modalService.createModal('test', {
            message: 'BOOOOOO #' + this.modalCount++
        });
        viewModel.getEventBus().subscribe((event: ModalEvent) => {
            switch(event.key) {
                case ModalEventKey.MODAL_OPENED: {
                    break;
                }
                case ModalEventKey.MODAL_CLOSED: {

                }
                case ModalEventKey.MODAL_DISMISSED: {
                    console.log(event.payload);
                    break;
                }
            }
            console.log('EVENT FROM MODAL', event);
        });

        setTimeout(() => {
            viewModel.close();
        }, 10000);
    }

}
