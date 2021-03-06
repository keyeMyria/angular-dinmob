import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LotesService } from 'app/services/lotes.service';
import { Lote } from 'app/model/lote';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-ventas-lote',
  templateUrl: './ventas-lote.component.html',
  styleUrls: ['./ventas-lote.component.scss']
})
export class VentasLoteComponent implements OnInit {

  numbermask = createNumberMask({
    allowDecimal: true,
    prefix: '',
    decimalLimit: 2
  });

  lote: any = {};
  clientes: any = [];
  cliente_selected: any = { pagos: [] };
  estados: any[] = [];
  form: FormGroup;

  //selector de clientes
  selection = new SelectionModel<any>(false);

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private loteSrv: LotesService,
    private fb: FormBuilder,
    public snackBar: MatSnackBar
  ) {

    this.form = this.fb.group({
      id_estado_venta: null,
      fecha_cambio_estado: null,
      valor_base: null,
      //valor_ampliacion: null
    });


  }

  ngOnInit() {


    this.route.data
      .subscribe((data: { estados: any }) => {
        this.estados = data.estados;
      });

    let id = this.route.snapshot.paramMap.get('id');

    this.loteSrv.getDetallesLoteVentas(id)
      .subscribe((res: any) => {
        //console.log("Lote OK", res);
        this.lote = res.lote;
        this.clientes = res.clientes;

        this.form.patchValue(this.lote);
      });
  }

  private clonar(objeto): any {

    let strObject = JSON.stringify(objeto);
    return JSON.parse(strObject);

  }

  guardar() {
    
    let lote = this.clonar(this.form.value);

    if(lote.valor_base){
      lote.valor_base = lote.valor_base.replace(/,/g, "");
    }
    //lote.valor_ampliacion = lote.valor_ampliacion.replace(/,/g, "");


    this.loteSrv.updateLote(this.lote.id_lote, lote)
      .subscribe((lote: any) => {
        this.lote = lote;
        this.form.patchValue(this.lote);
        this.snackBar.open("Lote Actualizado", "", {
          duration: 2000,
          panelClass: ["bg-success", "text-white"]
        });
      }, (error) => {
        this.snackBar.open("Ha ocurrido un error de conexión. Inténtelo más tarde", "", {
          duration: 3000,
          panelClass: ["bg-danger", "text-white"]
        });

      });
  }

  seleccionarCliente(cliente) {

    //console.log("seleccionar cliente");


    this.selection.toggle(cliente);
    if (this.selection.selected.length > 0) {
      this.cliente_selected = this.selection.selected[0];

    } else {
      this.cliente_selected = { pagos: [] };

    }

  }

  totalPagosRealizados() {

    /*   let total = 0;
      this.cliente_selected.pagos.forEach(pago => {
        if (pago.fecha_pago) {
          let monto = parseFloat(pago.monto);
          if (isNaN(monto)) {
            monto = 0;
          }
          total += monto;
  
        }
      });
      return Math.round(total * 100) / 100; */

    let total = 0;

    if (this.cliente_selected.pagos) {
      this.cliente_selected.pagos.forEach(pago => {

        //personalización CIVSA, para otras empresas sumar todo independiente del tipo 
        if (pago.tipo_pago != "Apartado" && pago.tipo_pago != "Avalúo") {
          total += +pago.monto;

        }

      });
    }
    return total;
  }

  saldoPendiente() {

    /*     let saldo = 0;
    
        if (this.cliente_selected.valor_operacion) {
          let valor = parseFloat(this.cliente_selected.valor_operacion);
          if (isNaN(valor)) {
            valor = 0;
          }
          saldo = valor - this.totalPagosRealizados();
        }
    
        return saldo; */


    let pendiente = 0;

    if (this.cliente_selected.valor_operacion) {

      pendiente = +this.cliente_selected.valor_operacion - this.totalPagosRealizados();

    }
    return pendiente;
  }

  gotoCliente(cliente, event) {
    event.stopPropagation();
    this.router.navigate(["/editar-cliente", cliente.id_cliente]);
  }



}
