import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-lotes-escrituracion',
  templateUrl: './lotes-escrituracion.component.html',
  styleUrls: ['./lotes-escrituracion.component.scss']
})
export class LotesEscrituracionComponent implements OnInit {
  obras: any = [];
  obra: any = {};
  obra_selected: string = "";

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.route.data
      .subscribe((data: { obras: any }) => {
        this.obras = data.obras;
      });
  }

  cargarObra(id_obra) {

    if (id_obra) {
      this.router.navigate([".", { obra: id_obra }]);
    } else {
      this.router.navigate([".", {}]);
    }

  }

}
