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
    allowDecimal: true
  });
  numberMask = createNumberMask({
    allowDecimal: true,
    prefix: '',
    decimalLimit: 6,
  });


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AgregarInsumoDialogoComponent>,
    private fb: FormBuilder,
    private prototipoSrv: PrototiposService
  ) {
    this.form = this.fb.group({
      id_insumo: ["", Validators.required],
      id_partida: [data.partida.id_partida, Validators.required],
      unidad: ["", Validators.required],
      precio: ["", Validators.required],
      cantidad: ["", Validators.required]

    });
  }

  ngOnInit() {
  }

  guardar() {
    //console.log("insumo", this.form.value);
    this.prototipoSrv.createInsumoPartida(this.form.value)
      .subscribe(insumo => {
        this.data.partida.insumos.push(insumo);
        this.dialogRef.close(true);
      }, (error) => {
        this.dialogRef.close({ error: "Ha ocurrido un error de conexión. Inténtelo más tarde" });
      });
  }

}
