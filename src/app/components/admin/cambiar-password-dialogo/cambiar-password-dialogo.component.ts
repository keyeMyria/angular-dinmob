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
      password: ["", Validators.required]

    });
  }

  ngOnInit() {

  }


  guardar() {

    console.log("usuario", this.form.value);
    this.usuarioSrv.updatePassword(this.data.usuario.id_usuario, this.form.value)
      .subscribe(usuario => {        
        this.dialogRef.close(true);
      });
  }

}
