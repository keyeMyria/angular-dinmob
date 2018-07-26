import { Component, OnInit, Inject } from '@angular/core';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';
import { InsumoService } from '../../../services/insumo.service';
import { Partida } from '../../../model/partida';

@Component({
  selector: 'app-editar-insumo-dialogo',
  templateUrl: './editar-insumo-dialogo.component.html',
  styleUrls: ['./editar-insumo-dialogo.component.scss']
})
export class EditarInsumoDialogoComponent implements OnInit {
  form: FormGroup;

  currencyMask = createNumberMask({
    allowDecimal: true
  });
  numberMask = createNumberMask({
    allowDecimal: true,
    prefix: '',
    decimalLimit: 6,
  });

  todas_ocurrencias: boolean = false;



  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditarInsumoDialogoComponent>,
    private fb: FormBuilder,
    private insumoSrv: InsumoService
  ) {
    this.form = this.fb.group({
      insumo: [data.insumo.insumo],
      unidad: [data.insumo.unidad],
      cantidad: [data.insumo.cantidad, Validators.required],
      precio: [data.insumo.precio, Validators.required]

    });

  }

  ngOnInit() {
  }

  guardar() {
    //console.log("ok", this.form.value)
    let cantidad = this.form.get("cantidad").value.replace(/,/g, "");
    let precio = this.form.get("precio").value.replace(/,/g, "");

    let insumo = { cantidad: cantidad, precio: precio };
    this.insumoSrv.updateInsumoPartida(this.data.insumo.id_insumo_partida, insumo, this.todas_ocurrencias, this.data.id_prototipo, this.data.insumo.id_insumo)
      .subscribe((res: any) => {

        if (this.todas_ocurrencias) {


          this.data.partidas.forEach(partida => {

            //buscamos en los insumos de las partidas
            partida.insumos.forEach(insumo => {
              if (insumo.id_insumo == this.data.insumo.id_insumo) {
                insumo.precio = res[insumo.id_insumo_partida].precio;
              }
            });

            //buscamos en los insumos de las subpartidas
            partida.subpartidas.forEach(subpartida => {
              subpartida.insumos.forEach(insumo => {
                if (insumo.id_insumo == this.data.insumo.id_insumo) {
                  insumo.precio = res[insumo.id_insumo_partida].precio;
                }
              });
            });


          });



        } else {
          this.data.insumo.cantidad = res.cantidad;
          this.data.insumo.precio = res.precio;
        }
        this.dialogRef.close(true);
      }, (error) => {
        this.dialogRef.close({ error: "Ha ocurrido un error de conexión. Inténtelo más tarde" });
      })
  }

}
