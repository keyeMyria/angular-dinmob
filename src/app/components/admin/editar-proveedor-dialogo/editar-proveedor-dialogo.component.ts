import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';
import { ProveedorService } from '../../../services/proveedor.service';

@Component({
  selector: 'app-editar-proveedor-dialogo',
  templateUrl: './editar-proveedor-dialogo.component.html',
  styleUrls: ['./editar-proveedor-dialogo.component.scss']
})
export class EditarProveedorDialogoComponent implements OnInit {
  form: FormGroup;
  public maskPhone = ['(', /\d/, /\d/, /\d/, ')', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditarProveedorDialogoComponent>,
    private fb: FormBuilder,
    private proveedorSrv: ProveedorService
  ) {
    this.form = this.fb.group({
      nombre: [data.proveedor.nombre, Validators.required],
      contacto: [data.proveedor.contacto],
      email: [data.proveedor.email],
      telefono: [data.proveedor.telefono],
      rfc: [data.proveedor.rfc],
      direccion: [data.proveedor.direccion],
      nota: [data.proveedor.nota]
    })
  }

  ngOnInit() {
  }

  guardar() {
    console.log("ok", this.form.value);

    this.proveedorSrv.updateProveedor(this.data.proveedor.id_proveedor, this.form.value)
      .subscribe(proveedor => {

        let i = this.data.proveedores.indexOf(this.data.proveedor);
        this.data.proveedores[i] = proveedor;
        this.dialogRef.close(true);

      },
        (error) => {
          this.dialogRef.close({ error: "Ha ocurrido un error. Vuelva a intentarlo más tarde." });
        });
  }

}
