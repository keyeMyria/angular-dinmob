import { Component, OnInit, Inject } from '@angular/core';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';
import { InsumoService } from '../../../services/insumo.service';

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
    console.log("ok", this.form.value)
    let insumo = {cantidad:this.form.get("cantidad").value, precio:this.form.get("precio").value};
    this.insumoSrv.updateInsumoPartida(this.data.insumo.id_insumo_partida, insumo)
    .subscribe(insumo => {
      this.data.insumo.cantidad = insumo.cantidad;
      this.data.insumo.precio = insumo.precio;
      this.dialogRef.close(true);
    }, (error) => {
      this.dialogRef.close({ error: "Ha ocurrido un error de conexión. Inténtelo más tarde" });
    })
  }

}
