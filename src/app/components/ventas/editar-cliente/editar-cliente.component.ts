import { Component, OnInit } from '@angular/core';
import { Cliente } from "app/model/cliente";
import { MatDialog, MatSnackBar } from "@angular/material";
import { AgregarDocumentoDialogoComponent } from "app/components/ventas/agregar-documento-dialogo/agregar-documento-dialogo.component";
import { ActivatedRoute, Router, ParamMap } from "@angular/router";
import "rxjs/add/operator/switchMap";
import { ClientesService } from "app/services/clientes.service";
import { NuevaCompraDialogoComponent } from 'app/components/ventas/nueva-compra-dialogo/nueva-compra-dialogo.component';
import { NuevoPagoDialogoComponent } from 'app/components/ventas/nuevo-pago-dialogo/nuevo-pago-dialogo.component';
import { EditarPagoDialogoComponent } from 'app/components/ventas/editar-pago-dialogo/editar-pago-dialogo.component';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import { Pago } from 'app/model/pago';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.scss']
})
export class EditarClienteComponent implements OnInit {

  numbermask = createNumberMask({
    allowDecimal: true
  });

  public maskRFC = [/[A-Z0-9]/i, /[A-Z0-9]/i, /[A-Z0-9]/i, /[A-Z0-9]/i, '-', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, '-', /[A-Z0-9]/i, /[A-Z0-9]/i, /[A-Z0-9]/i,]
  public maskCURP = [/[A-Z1-9]/i, /[A-Z1-9]/i, /[A-Z1-9]/i, /[A-Z1-9]/i, '-', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, '-', /[A-Z]/i, '-', /[A-Z]/i, /[A-Z]/i, '-', /[A-Z1-9]/i, /[A-Z1-9]/i, /[A-Z1-9]/i, '-', /[A-Z1-9]/i, /[A-Z]/i]
  public maskCP = [/\d/, /\d/, /\d/, /\d/, /\d/]
  public maskPhone = ['(', /\d/, /\d/, /\d/, ')', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
  public maskRFCM = [/[A-Z0-9]/i, /[A-Z0-9]/i, /[A-Z0-9]/i, '-', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, '-', /[A-Z0-9]/i, /[A-Z0-9]/i, /[A-Z0-9]/i,]

  cliente: Cliente = new Cliente();
  compras: any[] = [];
  selectedOption: string;
  compra_selected: any = {};
  pago: Pago;

  constructor(
    private clienteSrv: ClientesService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    /* this.cliente = new Cliente();
    this.cliente.persona_moral = "0"; */

    let id = this.route.snapshot.paramMap.get('id');


    this.clienteSrv.getCliente(id)
      .subscribe(res => {
        this.cliente = res;
      });

    this.clienteSrv.getCompras(id)
      .subscribe(compras => {
        this.compras = compras;
      });




  }

  selectCompra(compra, event) {

    if (event.checked) {
      this.compra_selected = compra;
    } else {
      this.compra_selected = {};
    };
  }


  agregarDocumento() {

    console.log();
    let dialogRef = this.dialog.open(AgregarDocumentoDialogoComponent, {
      data: {
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.selectedOption = result;
    });
  }

  updateCliente() {
    this.clienteSrv.updateCliente(this.cliente.id_cliente, this.cliente)
      .subscribe(res => {
        this.cliente = res;
        this.snackBar.open("Cliente Actualizado", "Cerrar", {
          duration: 2000
        });

      });

  }

  nuevaCompra() {
    console.log();
    let dialogRef = this.dialog.open(NuevaCompraDialogoComponent, {
      width: '400px',
      data: {
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.selectedOption = result;
    });
  }

  nuevoPago() {
    console.log();
    let dialogRef = this.dialog.open(NuevoPagoDialogoComponent, {
      width: '400px',
      data: {},
    });
    dialogRef.afterClosed().subscribe(result => {
      this.selectedOption = result;
    });

  }

  editarPago(pago) {

    let copia = Pago.copiar(pago);
    //copia.fecha_pago = "01/19/2018"
    console.log("Copia", copia);
    console.log("Pago", pago);
    let dialogRef = this.dialog.open(EditarPagoDialogoComponent, {
      width: '400px',
      data: { pago: copia },
    });
    dialogRef.afterClosed().subscribe(result => {
      this.selectedOption = result;
    });

  }



  onFechaChange() {

  }
}
