import { Directive, ElementRef, Renderer2 } from '@angular/core';
import { OnInit, OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { LoadingService } from 'app/services/loading.service';
import { Subscription } from 'rxjs/Subscription';


@Directive({
  selector: '[appLoading]'
})
export class LoadingDirective implements OnInit, OnDestroy {
  subscription: Subscription;

  constructor(
    private loadingSrv: LoadingService,
    private elementRef: ElementRef,
    private render: Renderer2
  ) {

    this.subscription = loadingSrv.event$
      .subscribe(visible => {
        this.elementRef.nativeElement.hidden = !visible;
        //console.log("subscription", visible, this.elementRef);
        if (visible) {
        
          //this.render.removeClass(this.elementRef.nativeElement, "bg-success");
          //this.render.addClass(this.elementRef.nativeElement, "bg-danger");
        } else {
          //this.render.removeClass(this.elementRef.nativeElement, "bg-danger");
          //this.render.addClass(this.elementRef.nativeElement, "bg-success");

        }

      }
      /*     , (error) => {
            this.elementRef.nativeElement.visible = false;
          } */
      );

  }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
