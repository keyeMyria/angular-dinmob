import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';
import { UsuarioService } from 'app/services/usuario.service';

@Component({
  selector: 'app-cambiar-password-dialogo',
  templateUrl: './cambiar-password-dialogo.component.html',
  styleUrls: ['./cambiar-password-dialogo.component.scss']
})
export class CambiarPasswordDialogoComponent implements OnInit {
  form: FormGroup;



  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CambiarPasswordDialogoComponent>,
    private fb: FormBuilder,
    private usuarioSrv: UsuarioService
  ) {
    this.form = this.fb.group({

      password: ["", Validators.required],
      confirmar: ["", Validators.required]

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

    console.log("usuario", this.form.value);
    this.usuarioSrv.updatePassword(this.data.usuario.id_usuario, this.form.get('password').value)
      .subscribe(res => {

        if (res.count === 1) {
          this.dialogRef.close(true);
        } else {
          this.dialogRef.close({ error: "Ha ocurrido un error. Vuelva a intentarlo más tarde." });
        }

      },
      (error) => {
        this.dialogRef.close({ error: "Ha ocurrido un error de conexión. Vuelva a intentarlo más tarde." });
      });
  }

}
