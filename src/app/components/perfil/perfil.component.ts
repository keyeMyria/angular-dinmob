import { Component, OnInit } from '@angular/core';
import { Obra } from "app/model/obra";
import { UsuarioService } from 'app/services/usuario.service';
import { ObrasService } from 'app/services/obras.service';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {


  formDatos: FormGroup;
  formPassword: FormGroup;
  obras: Obra[];
  usuario: any;


  constructor(
    private usuarioSrv: UsuarioService,
    private obraSrv: ObrasService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {

    this.formDatos = this.fb.group({
      nombre: ["", Validators.required],
      email: ["", Validators.required],
      id_obra_default: [""]

    });

    this.formPassword = this.fb.group({
      password: ["", Validators.required]
    });

  }

  ngOnInit() {


    this.usuarioSrv.getUsuarioLogged()
      .subscribe(usuario => {
        this.usuario = usuario;
        this.formDatos.patchValue(this.usuario);

      }, (error) => {

        this.snackBar.open("Ha ocurrido un error. Inténtelo más tarde", "", {
          duration: 3000
        });

      });


    this.route.data
      .subscribe((data: { obras: any[] }) => {
        this.obras = data.obras;
      });

  }


  updateUsuario() {

    //console.log("update", this.formDatos.value);
    this.usuarioSrv.updateUsuario(this.usuario.id_usuario, this.formDatos.value)
      .subscribe(usuario => {
        this.usuario = usuario;
        this.formDatos.patchValue(this.usuario);

        this.snackBar.open("Usuario Actualizado", "", {
          duration: 2000
        });

      }, (error) => {

        this.snackBar.open("Ha ocurrido un error. Inténtelo más tarde", "", {
          duration: 3000
        });

      });
  }

  updatePassword() {
    console.log("Not implemented");
  }

  print() {
    console.log("usuario actual", this.usuario);
  }

}
