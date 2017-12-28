import { 
  Injectable, 
  ComponentRef,
  ComponentFactoryResolver, 
  ViewContainerRef, 
  ReflectiveInjector
} from '@angular/core';

import { ChartAbstractComponent } from './chart/chart-abstract/chart-abstract.component';

@Injectable()
export class DynamicChartFactoryService {

  constructor( private factoryResolver: ComponentFactoryResolver ) { }

  createComponentInHostView( ComponentClass: typeof ChartAbstractComponent, rootView: ViewContainerRef ): ComponentRef<ChartAbstractComponent> {
    const factory = this.factoryResolver.resolveComponentFactory( ComponentClass );
    const component = factory.create( rootView.parentInjector );
    rootView.insert( component.hostView );
    return component;
  }

}
