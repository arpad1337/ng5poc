import { Injectable } from '@angular/core';

export interface PersistentKVStorage {
  setItem: ( key: string, value: string ) => any;
  getItem: ( key: string ) => string;
}

export class MockKVStore implements PersistentKVStorage {
  cache = {};
  setItem( k: string, v: string ) {
    this.cache[k] = v;
  }
  getItem( k: string ): string { 
    return this.cache[k];
  }
}

@Injectable()
export class LocalStorageRefService {
  driver: PersistentKVStorage;
  constructor( driver: PersistentKVStorage ) { 
    this.driver = driver;
  }

  setItem( key: string, value: any ) {
    this.driver.setItem( key, JSON.stringify( value ) );
  }

  getItem( key: string ): any {
    return JSON.parse(this.driver.getItem( key ));
  }

  hasKey( key: string ) {
    return !!this.getItem(key);
  }

  static createRef( driver?: any ): LocalStorageRefService {
    if( !driver ) {
      driver = new MockKVStore();
    }
    return new LocalStorageRefService( driver );
  }

}
