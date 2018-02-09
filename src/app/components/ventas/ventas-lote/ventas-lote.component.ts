import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LotesService } from 'app/services/lotes.service';
import { Lote } from 'app/model/lote';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';


@Component({
  selector: 'app-ventas-lote',
  templateUrl: './ventas-lote.component.html',
  styleUrls: ['./ventas-lote.component.scss']
})
export class VentasLoteComponent implements OnInit {

  lote: any = {};
  clientes: any = [];
  cliente_selected: any = { pagos: [] };
  estados: any[] = [];
  loading: boolean;
  form: FormGroup;

  //selector de clientes
  selection = new SelectionModel<any>(false);

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private loteSrv: LotesService,
    private fb: FormBuilder,
  ) {

    this.form = this.fb.group({
      id_estado_venta: null,
      fecha_cambio_estado: null,
      valor_base: null,
      valor_ampliacion: null
    });


  }

  ngOnInit() {


    this.route.data
      .subscribe((data: { estados: any }) => {
        this.estados = data.estados;
      });

    let id = this.route.snapshot.paramMap.get('id');

    this.loteSrv.getDetallesLoteVentas(id)
      .subscribe(res => {
        console.log("Lote OK", res);
        this.lote = res.lote;
        this.clientes = res.clientes;

        this.form.patchValue(this.lote);
      });
  }

  seleccionarCliente(cliente) {

    console.log("seleccionar cliente");
    

    this.selection.toggle(cliente);
    if (this.selection.selected.length > 0) {
      this.cliente_selected = this.selection.selected[0];

    } else {
      this.cliente_selected = { pagos: [] };

    }

  }

  totalPagosRealizados() {
    //console.log("pagos realizados");
    let total = 0;
    this.cliente_selected.pagos.forEach(pago => {
      if (pago.fecha_pago) {
        let monto = parseFloat(pago.monto);
        if (isNaN(monto)) {
          monto = 0;
        }
        total += monto;

      }
    });
    return Math.round(total * 100) / 100;
  }

  saldoPendiente() {
    //console.log("saldo pendiente");
    let saldo = 0;

    if (this.cliente_selected.valor_operacion) {
      let valor = parseFloat(this.cliente_selected.valor_operacion);
      if (isNaN(valor)) {
        valor = 0;
      }
      saldo = valor - this.totalPagosRealizados();
    }

    return saldo;
  }

  gotoCliente(cliente) {
    this.router.navigate(["/editar-cliente", cliente.id_cliente]);
  }


  onFechaChange() {

  }

}
