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
      id_tipo_usuario: ["", Validators.required]

    });

  }

  ngOnInit() {

  }

  guardar() {

    console.log("usuario", this.form.value);
    this.usuarioSrv.createUsuario(this.form.value)
      .subscribe(usuario => {

        this.data.usuarios.push(usuario);
        this.dialogRef.close(true);


      });
  }



}
