import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-trabajadores',
  templateUrl: './trabajadores.component.html',
  styleUrls: ['./trabajadores.component.scss']
})
export class TrabajadoresComponent implements OnInit {
  loading: boolean;
  obras: any = [];

  constructor(private route: ActivatedRoute,) { }

  ngOnInit() {
    this.route.data
    .subscribe((data: { obras: any[] }) => {
      //console.log("resultado resolve ", data);
      this.obras = data.obras;
    });
    //this.loading = true;
  }

}
