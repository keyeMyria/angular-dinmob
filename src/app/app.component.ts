import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
//import { filter } from 'rxjs/operators';
import 'rxjs/add/operator/filter';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})



export class AppComponent {
  routerSubscription: Subscription;

  constructor(private router: Router) { }

  ngOnInit() {
    this.routerSubscription = this.router.events
      .filter(event => event instanceof NavigationEnd)
      .subscribe(event => {
        //console.log("scrolltotop");

        /*    if (!(event instanceof NavigationEnd)) {
             return;
           } */
        //window.scrollTo(0, 0);
        document.querySelector('.mat-sidenav-content').scrollTop = 0;
      });
  }

  ngOnDestroy() {
    this.routerSubscription.unsubscribe();
  }

}

