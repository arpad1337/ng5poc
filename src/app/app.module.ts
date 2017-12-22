import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { ChartModule } from './chart/chart.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotFoundComponent } from './not-found/not-found.component';

import { AuthGuardService  } from './auth-guard.service';
import { APIService } from './api.service';
import { UserService } from './user.service';
import { BroadcasterService } from './broadcaster.service';
import { LocalStorageRefService } from './local-storage-ref.service';

import { APIInterceptor } from './api.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ChartModule,
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [ AuthGuardService ]
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: '**',
        component: NotFoundComponent
      }
    ],{
      enableTracing: true
    })
  ],
  providers: [
    APIService,
    UserService,
    BroadcasterService,
    AuthGuardService,
    { 
      provide: LocalStorageRefService,
      useFactory() {
        return LocalStorageRefService.createRef( window.localStorage );
      }
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: APIInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
