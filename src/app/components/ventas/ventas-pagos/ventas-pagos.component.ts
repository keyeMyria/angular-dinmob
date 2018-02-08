import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-ventas-pagos',
  templateUrl: './ventas-pagos.component.html',
  styleUrls: ['./ventas-pagos.component.scss']
})
export class VentasPagosComponent implements OnInit {
  obras: any = [];
  obra_selected: string = "";
  loading: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
 
    this.route.data
      .subscribe((data: { obras: any[] }) => {
        //console.log("resultado resolve ", data);
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
