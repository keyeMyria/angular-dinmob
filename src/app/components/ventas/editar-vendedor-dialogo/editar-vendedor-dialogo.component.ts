import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { VendedorService } from '../../../services/vendedor.service';

@Component({
  selector: 'app-editar-vendedor-dialogo',
  templateUrl: './editar-vendedor-dialogo.component.html',
  styleUrls: ['./editar-vendedor-dialogo.component.scss']
})
export class EditarVendedorDialogoComponent implements OnInit {
  form: FormGroup;
  public maskPhone = ['(', /\d/, /\d/, /\d/, ')', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditarVendedorDialogoComponent>,
    private fb: FormBuilder,
    private vendedorSrv: VendedorService
  ) {
    this.form = this.fb.group({
      nombre: [data.vendedor.nombre, Validators.required],
      email: [data.vendedor.email],
      cel: [data.vendedor.cel, Validators.required],
    });
  }

  ngOnInit() {
  }

  guardar() {
    console.log("datos", this.form.value);
    this.vendedorSrv.updateVendedor(this.data.vendedor.id_vendedor, this.form.value)
      .subscribe(vendedor => {

        let i = this.data.vendedores.indexOf(this.data.vendedor);
        this.data.vendedores[i] = vendedor;
        this.dialogRef.close(true);

      },
        (error) => {
          this.dialogRef.close({ error: "Ha ocurrido un error. Vuelva a intentarlo más tarde." });
        });
  }

}
