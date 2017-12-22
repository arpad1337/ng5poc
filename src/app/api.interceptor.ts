import { Injectable, Injector, Inject } from '@angular/core';
import { LocalStorageRefService } from './local-storage-ref.service';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpResponse, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/throw'
import 'rxjs/add/operator/catch';

export class APIInterceptor implements HttpInterceptor {

    constructor( @Inject(LocalStorageRefService) private storage: LocalStorageRefService ) {

    }

    intercept( req: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>> {
        console.log('Request Start', req);
        let clone: HttpRequest<any> = req.clone({
            setHeaders: { 'X-APP': 'RPI-NG5POC' }
        });
        if( this.storage.getItem('ACCESS_TOKEN') ) {
            const token = this.storage.getItem('ACCESS_TOKEN');
            clone = clone.clone({
                setHeaders: { 'Authorization': `Bearer ${token}` }
            });
        }
        return next
            .handle( clone )
            .do((ev: HttpEvent<any>) => {
                console.log('Response Event', ev);
                if( ev instanceof HttpResponse ) {
                    if( ev.body && ev.body['authResponse'] && ev.body['authResponse']['accessToken'] ) {
                        this.storage.setItem('ACCESS_TOKEN', ev.body['authResponse']['accessToken']);
                    }
                }
                return Observable.of(ev);
            })
            .catch((err:HttpErrorResponse) => {
                console.error('Response Error', err);
                if( err.status == 401 ) {
                    this.storage.setItem('ACCESS_TOKEN', null);
                }
                return Observable.throw(err);
            });
    }

}