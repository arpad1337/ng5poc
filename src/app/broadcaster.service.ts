import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

export interface BroadcasterEvent {
  key: any;
  data?: any;
}

@Injectable()
export class BroadcasterService {

  private eventBus: Subject<BroadcasterEvent>;

  constructor() {
    this.eventBus = new Subject<BroadcasterEvent>();
  }

  emit( key: any, data?: any ) {
    const event = {
      key,
      data
    };
    console.log('Broadcaster#emit event', event);    
    this.eventBus.next(event);
  }

  on<T>( key: any ): Observable<T> {
    return this.eventBus.asObservable()
      .filter((event) => event.key === key)
      .map((event) => event.data);
  }

}
