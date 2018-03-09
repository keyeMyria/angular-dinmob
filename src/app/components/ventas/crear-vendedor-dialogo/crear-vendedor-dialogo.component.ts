import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { VendedorService } from '../../../services/vendedor.service';

@Component({
  selector: 'app-crear-vendedor-dialogo',
  templateUrl: './crear-vendedor-dialogo.component.html',
  styleUrls: ['./crear-vendedor-dialogo.component.scss']
})
export class CrearVendedorDialogoComponent implements OnInit {
  form: FormGroup;
  public maskPhone = ['(', /\d/, /\d/, /\d/, ')', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CrearVendedorDialogoComponent>,
    private fb: FormBuilder,
    private vendedorSrv: VendedorService
  ) {
    this.form = this.fb.group({
      nombre: ["", Validators.required],
      email: [""],
      cel: ["", Validators.required],
      id_obra: [data.obra.id_obra, Validators.required],
    });
  }

  ngOnInit() {
  }

  guardar() {
    console.log("datos", this.form.value);
    this.vendedorSrv.createVendedor(this.form.value)
      .subscribe(vendedor => {
        this.data.vendedores.push(vendedor);
        this.dialogRef.close(true);

      },
        (error) => {
          this.dialogRef.close({ error: "Ha ocurrido un error de conexión. Inténtelo más tarde" });
        });
  }

}
