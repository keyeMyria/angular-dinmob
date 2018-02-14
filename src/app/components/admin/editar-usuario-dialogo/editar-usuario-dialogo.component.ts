import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';
import { UsuarioService } from 'app/services/usuario.service';


@Component({
  selector: 'app-editar-usuario-dialogo',
  templateUrl: './editar-usuario-dialogo.component.html',
  styleUrls: ['./editar-usuario-dialogo.component.scss']
})
export class EditarUsuarioDialogoComponent implements OnInit {
  form: FormGroup;


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditarUsuarioDialogoComponent>,
    private fb: FormBuilder,
    private usuarioSrv: UsuarioService

  ) {

    this.form = this.fb.group({
      nombre: [data.usuario.nombre, Validators.required],
      email: [data.usuario.email, Validators.required]
    });

  }

  ngOnInit() {


  }

  guardar() {
    //console.log("usuario", this.form.value);
    this.usuarioSrv.updateUsuario(this.data.usuario.id_usuario, this.form.value)
      .subscribe(usuario => {

        let i = this.data.usuarios.indexOf(this.data.usuario);
        this.data.usuarios[i] = usuario;
        this.dialogRef.close(true);

      },
      (error) => {
        this.dialogRef.close({ error: "Ha ocurrido un error. Vuelva a intentarlo más tarde." });
      });
  }


}
