import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { LoginComponent } from 'app/components/login/login.component';
import { LotesService } from 'app/services/lotes.service';

@Component({
  selector: 'app-agregar-lote-dialogo',
  templateUrl: './agregar-lote-dialogo.component.html',
  styleUrls: ['./agregar-lote-dialogo.component.scss']
})
export class AgregarLoteDialogoComponent implements OnInit {

  formLote: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AgregarLoteDialogoComponent>,
    private fb: FormBuilder,
    private loteSrv: LotesService
  ) {
    this.formLote = this.fb.group({
      tipo: "",
      nombre: ["", [Validators.required, Validators.maxLength(30)]],
      ini: ["", Validators.required],
      fin: "",
      prefijo: ["", [Validators.required, Validators.maxLength(30)]]
    });

    this.formLote.get("fin").setValidators([Validators.required, this.checkLoteFin.bind(this.formLote)]);

    this.formLote.controls["tipo"].valueChanges
      .subscribe((value) => {
        console.log("valueChanges", value);

        if (value == "nombre") {

          this.formLote.controls["ini"].disable();
          this.formLote.controls["fin"].disable();
          this.formLote.controls["prefijo"].disable();

          this.formLote.controls["nombre"].enable();


        } else {/* numero*/
          this.formLote.controls["ini"].enable();
          this.formLote.controls["fin"].enable();
          this.formLote.controls["prefijo"].enable();

          this.formLote.controls["nombre"].disable();
        }

      });

    this.formLote.patchValue({ "tipo": "numero" });

  }

  ngOnInit() {
  }


  checkLoteFin(control: FormControl): { [key: string]: boolean } {

    let form: any = this;
    console.log(form);


    if (control.value < form.get("ini").value) {
      return { menorqueini: true };
    } else if (control.value - form.get("ini").value > 20) {
      return { masde20: true };
    } else {
      return null;
    }
  }

  createLotes() {

    console.log("createLotes");
    this.dialogRef.close();

    if (this.formLote.value.tipo == "nombre") {

      this.loteSrv.addLoteByNombre(this.formLote.value.nombre, this.data.manzana.id_manzana)
        .subscribe(lote => {

          this.data.manzana.lotes.push(lote);

        });

    } else {
      let id_manzana = 1;
      this.loteSrv.addLoteByNumero(this.formLote.value.prefijo, this.formLote.value.ini, this.formLote.value.fin, this.data.manzana.id_manzana)
        .subscribe(lotes => {
          this.data.manzana.lotes.push(...lotes);
        });
    }


  }


}
