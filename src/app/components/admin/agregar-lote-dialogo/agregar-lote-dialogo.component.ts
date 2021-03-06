import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { LoginComponent } from 'app/components/login/login.component';
import { LotesService } from 'app/services/lotes.service';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

@Component({
  selector: 'app-agregar-lote-dialogo',
  templateUrl: './agregar-lote-dialogo.component.html',
  styleUrls: ['./agregar-lote-dialogo.component.scss']
})
export class AgregarLoteDialogoComponent implements OnInit {

  formLote: FormGroup;
  numberMask = createNumberMask({
    allowDecimal: true,
    prefix: '',
    decimalLimit: 2,
  });



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
      prefijo: ["Lote", [Validators.required, Validators.maxLength(30)]],
      comision_vendedor: "1.25",
      comision_gerente: "0.25",
      comision_expediente: "0.25"
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
    //console.log(form);


    if (control.value < form.get("ini").value) {
      return { menorqueini: true };
    } else if (control.value - form.get("ini").value > 30) {
      return { masde30: true };
    } else {
      return null;
    }
  }

  createLotes() {



    if (this.formLote.value.tipo == "nombre") {

      this.loteSrv.addLoteByNombre(this.formLote.value.nombre, this.data.manzana.id_manzana)
        .subscribe((lote: any) => {

          this.data.manzana.lotes.push(lote);
          this.dialogRef.close(true);

        }, (error) => {
          this.dialogRef.close({ error: "Ha ocurrido un error de conexión. Inténtelo más tarde" });
        });

    } else {

      this.loteSrv.addLoteByNumero(this.formLote.value.prefijo, this.formLote.value.ini, this.formLote.value.fin, this.data.manzana.id_manzana)
        .subscribe((lotes: any) => {
          this.data.manzana.lotes.push(...lotes);
          this.dialogRef.close(true);
        }, (error) => {
          this.dialogRef.close({ error: "Ha ocurrido un error de conexión. Inténtelo más tarde" });
        });
    }


  }


}
