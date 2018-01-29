import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';

type Constructor<T> = {
  new(...args: any[]): T; // any number and type of arguments
}

export enum ModalEventKey {
  MODAL_OPENED,
  MODAL_DISMISSED,
  MODAL_CLOSED
}

export interface ModalEvent {
  key: ModalEventKey;
  payload?: any;
}

export enum ModalCommand {
  CLOSE
}

export class ModalViewModel {

  eventBus: Subject<ModalEvent>;
  commandBus: Subject<ModalCommand>;
  payload: any;

  constructor( payload?: any ) {
    this.eventBus = new Subject<ModalEvent>();
    this.commandBus = new Subject<ModalCommand>();
    this.payload = payload;
  }

  close() {
    this.commandBus.next(ModalCommand.CLOSE);
  }

  emit( event: ModalEvent ) {
    this.eventBus.next( event );
  }

  getEventBus(): Observable<ModalEvent> {
    return this.eventBus.asObservable();
  }

  getCommandBus() {
    return this.commandBus.asObservable();
  }

}

export class ModalComponent implements AfterViewInit {
  _viewModel: ModalViewModel;
  get viewModel() {
    return this._viewModel;
  }
  set viewModel(value: ModalViewModel) {
    this._viewModel = value;
    value.getCommandBus().subscribe((event) => {
      if( event === ModalCommand.CLOSE ) {
        this.close();
      }
    });
  }
  close() {
    this.viewModel.emit({
      key: ModalEventKey.MODAL_CLOSED
    });
  }
  dismiss( payload? ) {
    this.viewModel.emit({
      key: ModalEventKey.MODAL_DISMISSED,
      payload: payload
    });
  }

  ngAfterViewInit() {
    this.viewModel.emit({
      key: ModalEventKey.MODAL_OPENED
    });
  }
}

export interface ModalComponentDescriptor {
  key: string;
  component: Constructor<ModalComponent>;
}

export interface ModalDesciptor {
  component: Constructor<ModalComponent>;
  viewModel: ModalViewModel;
}

@Injectable()
export class ModalService {

  config: Map<string, Constructor<ModalComponent>>;
  modalBus: Subject<ModalDesciptor>;

  constructor( config: Map<string, Constructor<ModalComponent>> ) {
    this.config = config;
    this.modalBus = new Subject<ModalDesciptor>();
  }

  createModal(key: string, payload: any): ModalViewModel {
    const component = this.config.get(key);
    const model = new ModalViewModel(payload);
    const descriptor = {
      viewModel: model,
      component: component
    };
    this.modalBus.next( descriptor );
    return model;
  }

  getModalBus(): Observable<ModalDesciptor> {
    return this.modalBus.asObservable();
  }

  static createServiceWithConfig( config: Map<string, Constructor<ModalComponent>> ) {
    return new ModalService(config);
  }

}
