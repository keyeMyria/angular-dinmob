import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-nueva-entrada',
  templateUrl: './nueva-entrada.component.html',
  styleUrls: ['./nueva-entrada.component.scss']
})
export class NuevaEntradaComponent implements OnInit {
  loading: boolean;
  obras: any = [];

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.data
    .subscribe((data: { obras: any[] }) => {
      this.obras = data.obras;
    });

  //this.loading = true;
  }

}
