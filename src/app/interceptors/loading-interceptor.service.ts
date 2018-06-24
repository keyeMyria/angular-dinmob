
import {tap} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpResponse, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoadingService } from 'app/services/loading.service';



@Injectable()
export class LoadingInterceptorService implements HttpInterceptor {

  count = 0;

  constructor(
    private loadingSrv: LoadingService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.count++;
    //console.log("start", this.count);
    this.loadingSrv.start();

    return next.handle(req).pipe(tap((event: HttpEvent<any>) => {
      // if the event is for http response
      if (event instanceof HttpResponse) {
        // stop our loader here
        this.count--;
        //console.log("stop", this.count);
        if (this.count == 0) {
          this.loadingSrv.stop();
        }
      }

    }, (err: any) => {
      // if any error (not for just HttpResponse) we stop our loader
      this.loadingSrv.stop();
      this.count = 0;
    }));
  }

}
