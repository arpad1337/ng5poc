import { Injectable } from '@angular/core';

export interface PersistentKVStorage {
  setItem: ( key: string, value: string ) => void;
  getItem: ( key: string ) => string;
}

export class MockKVStore implements PersistentKVStorage {
  cache: Map<string, string>;
  constructor() {
    this.cache = new Map<string, string>();
  }
  setItem( k: string, v: string ): void {
    this.cache.set(k, v);
  }
  getItem( k: string ): string { 
    return this.cache.get(k);
  }
}

@Injectable()
export class LocalStorageRefService {
  driver: PersistentKVStorage;
  constructor( driver: PersistentKVStorage ) { 
    this.driver = driver;
  }

  setItem( key: string, value: any ): void {
    this.driver.setItem( key, JSON.stringify( value ) );
  }

  getItem( key: string ): any {
    return JSON.parse(this.driver.getItem( key ));
  }

  hasKey( key: string ): boolean {
    return !!this.getItem(key);
  }

  static createRef( driver?: any ): LocalStorageRefService {
    if( !driver ) {
      driver = new MockKVStore();
    }
    return new LocalStorageRefService( driver );
  }

}
