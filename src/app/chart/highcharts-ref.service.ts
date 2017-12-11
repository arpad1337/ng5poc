import { Injectable } from '@angular/core';

@Injectable()
export class HighchartsRefService {

  lib: any;

  constructor( lib ) { 
    this.lib = lib;
  }

  static createRef( lib ) {
    return new HighchartsRefService( lib );
  }

}
