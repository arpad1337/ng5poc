import { Injectable } from '@angular/core';

export interface LoggerDriver {
  info: Function;
  log: Function;
  warn: Function;
  error: Function;
}

@Injectable()
export class LoggerService {

  driver: LoggerDriver;

  constructor(driver: LoggerDriver) {
    this.driver = driver;
  }

  log(...args: Array<any>) {
    this.driver.log.apply(this.driver, args);
  }

  info(...args: Array<any>) {
    this.driver.info.apply(this.driver, args);
  }

  warn(...args: Array<any>) {
    this.driver.warn.apply(this.driver, args);
  }

  error(...args: Array<any>) {
    this.driver.error.apply(this.driver, args);
  }

  static createService(driver: LoggerDriver): LoggerService {
    return new LoggerService(driver);
  }

}
