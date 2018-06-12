import { Component, OnInit, Inject } from '@angular/core';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { PrototiposService } from '../../../services/prototipos.service';

@Component({
  selector: 'app-agregar-insumo-dialogo',
  templateUrl: './agregar-insumo-dialogo.component.html',
  styleUrls: ['./agregar-insumo-dialogo.component.scss']
})
export class AgregarInsumoDialogoComponent implements OnInit {
  form: FormGroup;

  currencyMask = createNumberMask({
    allowDecimal: true,
    prefix: '',
    decimalLimit: 2,
  });
  numberMask = createNumberMask({
    allowDecimal: true,
    prefix: '',
    decimalLimit: 6,
  });

  insumo_selected: any = "";


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AgregarInsumoDialogoComponent>,
    private fb: FormBuilder,
    private prototipoSrv: PrototiposService
  ) {
    this.form = this.fb.group({
      insumo: ["", Validators.required],
      //id_partida: [data.partida.id_partida, Validators.required],
      precio: ["", Validators.required],
      cantidad: ["", Validators.required]

    });
  }

  ngOnInit() {
  }
  /* 
    private clonar(objeto): any {
  
      let strObject = JSON.stringify(objeto);
      return JSON.parse(strObject);
  
    }
   */

  guardar() {
    let insumo = {
      id_insumo: this.form.value['insumo'].id_insumo,
      id_partida: this.data.partida.id_partida,
      cantidad: this.form.value['cantidad'],
      precio: this.form.value['precio']
    };
    console.log("insumo", insumo);

    if (insumo.cantidad) {
      insumo.cantidad = insumo.cantidad.replace(/,/g, "");
    }
    if (insumo.precio) {
      insumo.precio = insumo.precio.replace(/,/g, "");
    }


    this.prototipoSrv.createInsumoPartida(insumo)
      .subscribe(insumo_partida => {
        this.data.partida.insumos.push(insumo_partida);
        this.dialogRef.close(true);
      }, (error) => {
        this.dialogRef.close({ error: "Ha ocurrido un error de conexión. Inténtelo más tarde" });
      });
  }

}
