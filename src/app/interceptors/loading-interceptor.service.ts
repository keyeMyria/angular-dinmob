import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest,HttpResponse, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { LoadingService } from 'app/services/loading.service';
import 'rxjs/add/operator/do';


@Injectable()
export class LoadingInterceptorService implements HttpInterceptor {


  constructor(
    private loadingSrv: LoadingService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loadingSrv.start();

    return next.handle(req).do((event: HttpEvent<any>) => {
      // if the event is for http response
      if (event instanceof HttpResponse) {
        // stop our loader here
        this.loadingSrv.stop();
      }

    }, (err: any) => {
      // if any error (not for just HttpResponse) we stop our loader
      this.loadingSrv.stop();
    });
  }

}
