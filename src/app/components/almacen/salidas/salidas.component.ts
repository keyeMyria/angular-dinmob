import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-salidas',
  templateUrl: './salidas.component.html',
  styleUrls: ['./salidas.component.scss']
})
export class SalidasComponent implements OnInit {
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
        this.obras = data.obras;
      });
  }

}
