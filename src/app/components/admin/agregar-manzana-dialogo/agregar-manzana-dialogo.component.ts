import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { LoginComponent } from 'app/components/login/login.component';
import { ManzanasService } from 'app/services/manzanas.service';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-agregar-manzana-dialogo',
  templateUrl: './agregar-manzana-dialogo.component.html',
  styleUrls: ['./agregar-manzana-dialogo.component.scss']
})
export class AgregarManzanaDialogoComponent implements OnInit {
  formManzana: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AgregarManzanaDialogoComponent>,
    private fb: FormBuilder,
    private manzanaSrv: ManzanasService
  ) {

    this.formManzana = this.fb.group({
      tipo: "",
      nombre: ["", [Validators.required, Validators.maxLength(30)]],
      ini: ["", Validators.required],
      fin: "",
      prefijo: ["Manzana", [Validators.required, Validators.maxLength(30)]]
    });

    this.formManzana.get("fin").setValidators([Validators.required, this.checkManzanaFin.bind(this.formManzana)]);

    this.formManzana.controls["tipo"].valueChanges
      .subscribe((value) => {
        //console.log("valueChanges", value);

        if (value == "nombre") {

          this.formManzana.controls["ini"].disable();
          this.formManzana.controls["fin"].disable();
          this.formManzana.controls["prefijo"].disable();

          this.formManzana.controls["nombre"].enable();


        } else {/* numero*/
          this.formManzana.controls["ini"].enable();
          this.formManzana.controls["fin"].enable();
          this.formManzana.controls["prefijo"].enable();

          this.formManzana.controls["nombre"].disable();
        }

      });

    this.formManzana.patchValue({ "tipo": "numero" });

  }

  ngOnInit() {
  }

  checkManzanaFin(control: FormControl): { [key: string]: boolean } {

    let form: any = this;
    //console.log(form);


    if (control.value < form.get("ini").value) {
      return { menorqueini: true };
    } else if (control.value - form.get("ini").value > 20) {
      return { masde20: true };
    } else {
      return null;
    }
  }

  createManzanas() {

    //console.log("createManzanas");  
    //console.log("obra", this.data.obra);


    if (this.formManzana.value.tipo == "nombre") {

      this.manzanaSrv.addManzanaByNombre(this.formManzana.value.nombre, this.data.obra.obra.id_obra)
        .subscribe(manzana => {
          this.data.obra.manzanas.push(manzana);
          this.data.selection.push(new SelectionModel<any>(true, []));
          this.dialogRef.close(true);
        }, (error) => {
          this.dialogRef.close(error);
        });

    } else {

      this.manzanaSrv.addManzanaByNumero(this.formManzana.value.prefijo, this.formManzana.value.ini, this.formManzana.value.fin, this.data.obra.obra.id_obra)
        .subscribe((manzanas: any) => {
          this.data.obra.manzanas.push(...manzanas);
          for (let i = 0; i < manzanas.length; i++) {
            this.data.selection.push(new SelectionModel<any>(true, []));
          }

          this.dialogRef.close(true);
        }, (error) => {
          this.dialogRef.close(error);
        });
    }


  }

}
