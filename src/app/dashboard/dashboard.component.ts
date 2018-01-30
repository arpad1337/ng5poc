import { Component, AfterViewInit, ViewContainerRef, ViewChild, ComponentRef, ComponentFactoryResolver } from '@angular/core';
import { ModalService, ModalEvent, ModalEventKey } from '../modal/modal.service';

import { PieChartComponent } from '../chart/pie-chart/pie-chart.component';
import { ChartAbstractComponent } from '../chart/chart-abstract/chart-abstract.component';

import { Debounce } from '../app.helper';
import { Injector } from '@angular/core/src/di/injector';

type Constructor<T> = {
  new(...args: any[]): T; // any number and type of arguments
}

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
    private modalService: ModalService,
    private factoryResolver: ComponentFactoryResolver
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

  createComponent<ChartAbstractComponent>(ComponentClass: Constructor<ChartAbstractComponent>, parentInjector: Injector): ComponentRef<ChartAbstractComponent> {
    const factory = this.factoryResolver.resolveComponentFactory(ComponentClass);
    const component = factory.create(parentInjector);
    return component;
  }

  ngAfterViewInit() {
    const component: ComponentRef<PieChartComponent> = this.createComponent(PieChartComponent, this.viewContainerRef.parentInjector);
    component.instance.chartConfig = this.chartConfig;
    this.viewContainerRef.insert(component.hostView);
    console.log(this.chartConfig);
    const component2 = this.createComponent(PieChartComponent, this.viewContainerRef.parentInjector);
    component2.instance.chartConfig = this.chartConfig;
    this.viewContainerRef.insert(component2.hostView);
    setTimeout(() => {
      this.destroyComponent(component2);

    }, 5000)
    this.changeConfig(component);
  }

  @Debounce(10000)
  changeConfig(component: ComponentRef<any>) {
    this.data = this.data.map((row) => {
      if (row.name == 'IE') {
        row.y -= 10;
      }
      if (row.name == 'Chrome') {
        row.y += 10;
      }
      return row;
    });
    this.chartConfig.series.data = this.data;
    component.instance.chartConfig = this.chartConfig;
    this.destroyComponent(component);
  }

  @Debounce(10000)
  destroyComponent(component: ComponentRef<any>) {
    component.destroy();
  }


  modalCount = 1;
  showModal() {
    const viewModel = this.modalService.createModal('test', {
      message: 'BOOOOOO #' + this.modalCount++
    });
    viewModel.getEventBus().subscribe((event: ModalEvent) => {
      switch (event.key) {
        case ModalEventKey.MODAL_OPENED: {
          console.log('MODAL OPENED', viewModel);
          break;
        }
        case ModalEventKey.MODAL_CLOSED: {
          console.log('MODAL CLOSED', viewModel);
          break;
        }
        case ModalEventKey.MODAL_DISMISSED: {
          console.log('MODAL DISMISSED', viewModel);
          console.log(event.payload);
          break;
        }
      }
    });

    setTimeout(() => {
      viewModel.close();
    }, 10000);
  }

}
