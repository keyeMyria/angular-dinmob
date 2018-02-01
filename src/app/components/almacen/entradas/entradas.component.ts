import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-entradas',
  templateUrl: './entradas.component.html',
  styleUrls: ['./entradas.component.scss']
})
export class EntradasComponent implements OnInit {
  obras: any = [];
  loading: boolean;
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    //this.loading = true;
    this.route.data
    .subscribe((data: { obras: any[] }) => {
      //console.log("resultado resolve ", data);
      this.obras = data.obras;
    });
  }

}
