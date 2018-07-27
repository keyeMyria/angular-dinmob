import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import { InsumoService } from 'app/services/insumo.service';


@Component({
  selector: 'app-nuevo-insumo-catalogo-dialogo',
  templateUrl: './nuevo-insumo-catalogo-dialogo.component.html',
  styleUrls: ['./nuevo-insumo-catalogo-dialogo.component.scss']
})
export class NuevoInsumoCatalogoDialogoComponent implements OnInit {
  form: FormGroup;
  existente: any = {};
  existe = false;
  numberMask = createNumberMask({
    allowDecimal: true,
    prefix: '',
    decimalLimit: 2
  });

  public maskCodigo = ['M', 'A', /\d/, /\d/, /\d/, /\d/];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<NuevoInsumoCatalogoDialogoComponent>,
    private fb: FormBuilder,
    private insumoSrv: InsumoService
  ) {
    this.form = this.fb.group({
      id_familia: ["", Validators.required],
      codigo: ["", Validators.required],
      insumo: ["", Validators.required],
      unidad: ["", Validators.required],
      precio: [""]
    });
  }

  ngOnInit() {
  }

  guardar() {
    //comprobamos que el código no exista
    let existe = this.data.materiales.find(mat => mat.codigo == this.form.value.codigo);

    //si no existe podemos crearlo
    if (existe == undefined) {
      this.insumoSrv.createMaterial(this.form.value, this.data.obra)
        .subscribe(insumo => {
          this.data.materiales.unshift(insumo);
          this.data.materiales.sort((a, b) => a.insumo > b.insumo ? 1 : -1);

          this.dialogRef.close(true);
        },
          (error) => {
            this.dialogRef.close({ error: "Ha ocurrido un error de conexión. Inténtelo más tarde" });
          });
    } else {
      this.existente = existe;
      this.existe = true
    }
  }

}
