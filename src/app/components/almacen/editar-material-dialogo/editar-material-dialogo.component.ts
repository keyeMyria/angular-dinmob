import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import { InsumoService } from '../../../services/insumo.service';

@Component({
  selector: 'app-editar-material-dialogo',
  templateUrl: './editar-material-dialogo.component.html',
  styleUrls: ['./editar-material-dialogo.component.scss']
})
export class EditarMaterialDialogoComponent implements OnInit {
  form: FormGroup;
  numberMask = createNumberMask({
    allowDecimal: true,
    prefix: '',
    decimalLimit: 2
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditarMaterialDialogoComponent>,
    private fb: FormBuilder,
    private insumoSrv: InsumoService
  ) {
    this.form = this.fb.group({
      codigo: [data.material.codigo, Validators.required],
      insumo: [data.material.insumo, Validators.required],
      unidad: [data.material.unidad, Validators.required],
      existencias: [data.material.existencias, Validators.required]
    });
  }

  ngOnInit() {
  }

  guardar() {
    console.log("ok", this.form.value);

    this.insumoSrv.updateInsumo(this.data.material.id_insumo, this.form.value)
      .subscribe(insumo => {

         // Edita la lista original de materiales
         let i = this.data.materiales.indexOf(this.data.material);
         this.data.materiales[i] = insumo;
         // Edita la lista de materiales filtrados
         let j = this.data.materiales_filtrados.indexOf(this.data.material);
         this.data.materiales_filtrados[j] = insumo;
 
         this.dialogRef.close(true);

      }, (error) => {
        this.dialogRef.close({ error: "Ha ocurrido un error. Vuelva a intentarlo más tarde." });
      });
  }

}
