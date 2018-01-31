import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise'

@Injectable()
export class APIService {

  constructor( private httpClient: HttpClient ) { 

  }

  echo(): Promise<any> {
    return this.httpClient.get('/assets/dummy.json').toPromise();
  }

  get(...args: Array<any>) {
    return this.httpClient.get.apply(this.httpClient, args).toPromise();
  }

}
