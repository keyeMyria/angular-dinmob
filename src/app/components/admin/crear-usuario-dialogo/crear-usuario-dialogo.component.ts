import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { UsuarioService } from "app/services/usuario.service";
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-crear-usuario-dialogo',
  templateUrl: './crear-usuario-dialogo.component.html',
  styleUrls: ['./crear-usuario-dialogo.component.scss']
})
export class CrearUsuarioDialogoComponent implements OnInit {
  form: FormGroup;
  loading: boolean;


  constructor(
    private usuarioSrv: UsuarioService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CrearUsuarioDialogoComponent>,
    private fb: FormBuilder,
  ) {

    this.form = this.fb.group({
      nombre: ["", Validators.required],
      email: ["", Validators.required],
      password: ["", Validators.required],
      confirmar: ["", Validators.required],
      id_tipo_usuario: ["", Validators.required]
    }, { validator: this.checkIfMatchingPasswords("password", "confirmar") });

  }


  checkIfMatchingPasswords(passwordKey: string, passwordConfirmationKey: string) {

    return (group: FormGroup) => {

      let passwordInput = group.controls[passwordKey];
      let passwordConfirmationInput = group.controls[passwordConfirmationKey];

      if (passwordInput.value !== passwordConfirmationInput.value) {

        //le asignamos el error al input confirmar
        return passwordConfirmationInput.setErrors({ notEqual: true });

      } else {

        return passwordConfirmationInput.setErrors(null);

      }
    }
  }


  ngOnInit() {

  }

  guardar() {

    this.loading=true;
    this.usuarioSrv.createUsuario(this.form.value)
      .subscribe(usuario => {
        this.loading=false;
        this.data.usuarios.push(usuario);
        this.dialogRef.close(true);

      },
      (error) => {
        this.loading=false;
        this.dialogRef.close({ error: "Ha ocurrido un error de conexión. Inténtelo más tarde" });
      });
  }

  debug() {
    console.log("formgroup", this.form);
    console.log("value", this.form.value);
    console.log("status", this.form.status);
  }



}
