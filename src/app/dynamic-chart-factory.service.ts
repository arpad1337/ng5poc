import { 
  Injectable, 
  ComponentRef,
  ComponentFactoryResolver, 
  ViewContainerRef, 
  ReflectiveInjector
} from '@angular/core';

@Injectable()
export class DynamicChartFactoryService {

  constructor( private factoryResolver: ComponentFactoryResolver ) { }

  createComponentInHostView( componentClass: any, rootView: ViewContainerRef ): ComponentRef<any> {
    const factory = this.factoryResolver.resolveComponentFactory( componentClass );
    const component = factory.create( rootView.parentInjector );
    rootView.insert( component.hostView );
    return component;
  }

}
