import { 
  Injectable, 
  ComponentRef,
  ComponentFactoryResolver, 
  ViewContainerRef, 
  ReflectiveInjector,
} from '@angular/core';

import { ChartAbstractComponent } from './chart/chart-abstract/chart-abstract.component';

type Constructor<T> = {
  new(...args: any[]): T; // any number and type of arguments
}

@Injectable()
export class DynamicChartFactoryService {

  constructor( private factoryResolver: ComponentFactoryResolver ) { }

  createComponentInHostView<ChartAbstractComponent>( ComponentClass: Constructor<ChartAbstractComponent>, rootView: ViewContainerRef ): ComponentRef<ChartAbstractComponent> {
    const factory = this.factoryResolver.resolveComponentFactory( ComponentClass );
    const component = factory.create( rootView.parentInjector );
    rootView.insert( component.hostView );
    return component;
  }

}
