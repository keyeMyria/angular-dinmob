import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LoadingService {

  private _visible: boolean = false;

  private eventSource: Subject<boolean> = new Subject<boolean>();
  public event$: Observable<boolean> = this.eventSource.asObservable();

  constructor() { }

  get visible() {
    return this._visible;
  }

  set visible(value: boolean) {
    this._visible = value;
  }

  start() {
    this.eventSource.next(true);
    this._visible=true;
  }

  stop() {
    this.eventSource.next(false);
    this._visible=false;
  }

}
