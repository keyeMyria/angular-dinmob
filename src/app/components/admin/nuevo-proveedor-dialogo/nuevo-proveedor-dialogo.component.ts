import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';
import { ProveedorService } from '../../../services/proveedor.service';

@Component({
  selector: 'app-nuevo-proveedor-dialogo',
  templateUrl: './nuevo-proveedor-dialogo.component.html',
  styleUrls: ['./nuevo-proveedor-dialogo.component.scss']
})
export class NuevoProveedorDialogoComponent implements OnInit {
  form: FormGroup;
  public maskPhone = ['(', /\d/, /\d/, /\d/, ')', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<NuevoProveedorDialogoComponent>,
    private fb: FormBuilder,
    private proveedorSrv: ProveedorService
  ) {
    this.form = this.fb.group({
      nombre: ["", Validators.required],
      contacto: [""],
      email: [""],
      telefono: [""],
      rfc: [""],
      direccion: [""],
      nota: [""]
    })
  }

  ngOnInit() {
  }

  guardar() {
    console.log("ok", this.form.value);
    this.proveedorSrv.createProveedor(this.form.value)
      .subscribe(proveedor => {
        this.data.proveedores.push(proveedor);
        this.dialogRef.close(true);

      },
        (error) => {
          this.dialogRef.close({ error: "Ha ocurrido un error de conexión. Inténtelo más tarde" });
        });

  }

}
