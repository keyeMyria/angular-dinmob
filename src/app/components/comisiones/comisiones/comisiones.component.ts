import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-comisiones',
  templateUrl: './comisiones.component.html',
  styleUrls: ['./comisiones.component.scss']
})
export class ComisionesComponent implements OnInit {
  obras: any = [];
  obra_selected: string = "";
  comisiones = [
    {
      manzana: "1Mzn", lote: "Lote 1", valor_operacion: "1000", vendedor: "1000", gerente: "2000", expediente: "5000",
      pagos: [
        { monto: "1500", fecha: "12-feb-2018", destinatario: "Emilio" },
        { monto: "1500", fecha: "12-feb-2018", destinatario: "Emilio" },
        { monto: "1500", fecha: "12-feb-2018", destinatario: "Emilio" },
        { monto: "1500", fecha: "12-feb-2018", destinatario: "Emilio" }
      ]
    },
    {
      manzana: "1Mzn", lote: "Lote 1", valor_operacion: "1000", vendedor: "1000", gerente: "2000", expediente: "5000",
      pagos: [
        { monto: "1500", fecha: "12-feb-2018", destinatario: "Emilio" },
        { monto: "1500", fecha: "12-feb-2018", destinatario: "Emilio" },
        { monto: "1500", fecha: "12-feb-2018", destinatario: "Emilio" },
        { monto: "1500", fecha: "12-feb-2018", destinatario: "Emilio" }
      ]
    },
    {
      manzana: "1Mzn", lote: "Lote 1", valor_operacion: "1000", vendedor: "1000", gerente: "2000", expediente: "5000",
      pagos: [
        { monto: "1500", fecha: "12-feb-2018", destinatario: "Emilio" },
        { monto: "1500", fecha: "12-feb-2018", destinatario: "Emilio" },
        { monto: "1500", fecha: "12-feb-2018", destinatario: "Emilio" },
        { monto: "1500", fecha: "12-feb-2018", destinatario: "Emilio" }
      ]
    },
    {
      manzana: "1Mzn", lote: "Lote 1", valor_operacion: "1000", vendedor: "1000", gerente: "2000", expediente: "5000",
      pagos: [
        { monto: "1500", fecha: "12-feb-2018", destinatario: "Emilio" },
        { monto: "1500", fecha: "12-feb-2018", destinatario: "Emilio" },
        { monto: "1500", fecha: "12-feb-2018", destinatario: "Emilio" },
        { monto: "1500", fecha: "12-feb-2018", destinatario: "Emilio" }
      ]
    },
    { manzana: "1Mzn", lote: "Lote 1", valor_operacion: "1000", vendedor: "1000", gerente: "2000", expediente: "5000" }
  ];



  constructor(
    private router: Router,
    private route: ActivatedRoute,
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

  verComisiones(comision) {


  }

}


