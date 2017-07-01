import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[myCollapse]',
  host:{
    '[class.collapse]':'true',
    '[class.show]':'!collapsed'
  }
})
export class MyCollapseDirective {

  @Input('myCollapse') collapsed=false;

  constructor() { }

}
