import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';
import { LotesService } from 'app/services/lotes.service';

@Component({
  selector: 'app-editar-lote-dialogo',
  templateUrl: './editar-lote-dialogo.component.html',
  styleUrls: ['./editar-lote-dialogo.component.scss']
})
export class EditarLoteDialogoComponent implements OnInit {

  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditarLoteDialogoComponent>,
    private loteSrv: LotesService,
    private fb: FormBuilder,
  ) {

    console.log(this.data.lote);

    this.form = this.fb.group({
      nombre: [this.data.lote.nombre, Validators.required],
      code: this.data.lote.code,
      valor_base: this.data.lote.valor_base,
      valor_ampliacion: this.data.lote.valor_ampliacion,
      en_venta: this.data.lote.en_venta == "1" ? true : false,
      prototipos: this.fb.array([], this.checkRepetidos)
    });

    this.data.lote.prototipos.forEach(prototipo => {
      (<FormArray>this.form.controls["prototipos"]).push(new FormControl(prototipo.id_prototipo, Validators.required));
    });



  }


  checkRepetidos(control: FormArray): { [key: string]: boolean } {

    //console.log("chekrepetidos", control);

    let tiene_repetidos = (new Set(control.value)).size !== control.value.length;

    if (tiene_repetidos) {
      return { repetidos: true };
    } else {
      return null;
    }

  }


  ngOnInit() {
  }

  addPrototipo() {
    (<FormArray>this.form.controls["prototipos"]).push(new FormControl("", Validators.required));
  }

  delPrototipo(index: number) {
    (<FormArray>this.form.controls["prototipos"]).removeAt(index);
  }

  guardar() {
    console.log("guardar");
    this.dialogRef.close(true);

    this.loteSrv.updateLote(this.data.lote.id_lote, this.form.value)
      .subscribe(
      lote => {

        let i = this.data.lotes.indexOf(this.data.lote);
        this.data.lotes[i] = lote;

      }, (error) => {
        this.dialogRef.close({ error: "Ha ocurrido un error. Vuelva a intentarlo más tarde." });
      });
  }

  debug() {
    console.log("formgroup", this.form);
    console.log("value", this.form.value);
    console.log("status", this.form.status);
  }



}
