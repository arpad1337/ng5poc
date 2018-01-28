import { Component, OnInit, ComponentFactoryResolver, ReflectiveInjector, ViewContainerRef, ViewChild, ComponentRef } from '@angular/core';
import { ModalService, ModalDesciptor, ModalComponent, ModalEventKey, ModalEvent } from '../modal.service';

@Component({
  selector: 'modal-outlet',
  templateUrl: './modal-outlet.component.html',
  styleUrls: ['./modal-outlet.component.scss']
})
export class ModalOutletComponent implements OnInit {

  modalQueue: Array<ModalDesciptor>;
  currentModal: ComponentRef<ModalComponent>;

  @ViewChild('container', { 
    read: ViewContainerRef
  }) containerRef: ViewContainerRef


  constructor( private modalService: ModalService, private factoryResolver: ComponentFactoryResolver ) {
    this.modalQueue = []
  }

  ngOnInit() {
    this.modalService.getModalBus().subscribe((descriptor) => {
      this.modalQueue.push( descriptor );
      if( !this.currentModal ) {
        this.showNext();
      }
    });
  }

  showNext() {
    if( this.currentModal ) {
      return;
    }
    if( this.modalQueue.length === 0 )  {
      return;
    }
    const descriptor = this.modalQueue.shift();
    const factory = this.factoryResolver.resolveComponentFactory( descriptor.component );
    const component = factory.create( this.containerRef.parentInjector );
    const componentRef = component.instance as ModalComponent;
    componentRef.viewModel = descriptor.viewModel;
    descriptor.viewModel.getEventBus().subscribe((event: ModalEvent) => {
      if( event.key === ModalEventKey.MODAL_CLOSED ) {
        this.containerRef.clear();
        component.destroy();
        this.currentModal = null;
        this.showNext();
      }
    });
    this.containerRef.clear();
    this.containerRef.insert( component.hostView );
    this.currentModal = component;
    setTimeout(() => {
      descriptor.viewModel.emit({
        key: ModalEventKey.MODAL_OPENED
      });
    }, 100);
  }
}
