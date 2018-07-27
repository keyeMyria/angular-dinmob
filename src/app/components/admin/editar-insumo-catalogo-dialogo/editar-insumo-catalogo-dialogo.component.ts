import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import { InsumoService } from '../../../services/insumo.service';

@Component({
  selector: 'app-editar-insumo-catalogo-dialogo',
  templateUrl: './editar-insumo-catalogo-dialogo.component.html',
  styleUrls: ['./editar-insumo-catalogo-dialogo.component.scss']
})
export class EditarInsumoCatalogoDialogoComponent implements OnInit {
  form: FormGroup;
  numberMask = createNumberMask({
    allowDecimal: true,
    prefix: '',
    decimalLimit: 2
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditarInsumoCatalogoDialogoComponent>,
    private fb: FormBuilder,
    private insumoSrv: InsumoService
  ) {
    this.form = this.fb.group({
      id_familia: [data.material.id_familia],
      codigo: [data.material.codigo, Validators.required],
      insumo: [data.material.insumo, Validators.required],
      unidad: [data.material.unidad, Validators.required],
      precio: [data.material.precio, Validators.required]
    });
  }

  ngOnInit() {
  }


  private clonar(objeto): any {

    let strObject = JSON.stringify(objeto);
    return JSON.parse(strObject);

  }

  guardar() {
    console.log("ok", this.form.value);

    let insumo = this.clonar(this.form.value);
    if (insumo.precio) {
      insumo.precio = insumo.precio.replace(/,/g, "");
    }

    this.insumoSrv.updateInsumo(this.data.material.id_insumo, insumo)
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
