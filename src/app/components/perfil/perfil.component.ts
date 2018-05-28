import { Component, OnInit } from '@angular/core';
import { Obra } from "app/model/obra";
import { UsuarioService } from 'app/services/usuario.service';
import { ObrasService } from 'app/services/obras.service';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { AuthService } from '../../services/auth.service';


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
    private authSrv: AuthService,
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
      password: ["", Validators.required],
      confirmar: ["", Validators.required]
    }, { validator: this.checkIfMatchingPasswords("password", "confirmar") });

  }

  ngOnInit() {


    /*     this.usuarioSrv.getUsuarioLogged()
          .subscribe(usuario => {
            this.usuario = usuario;
            this.formDatos.patchValue(this.usuario);
    
          }, (error) => {
    
            this.snackBar.open("Ha ocurrido un error de conexión. Inténtelo más tarde", "", {
              duration: 3000,
              panelClass: ["bg-danger", "text-white"]
    
            });
    
          }); */
    this.usuario = this.authSrv.usuario;

    this.route.data
      .subscribe((data: { obras: any, usuario: any }) => {
        this.obras = data.obras;
        //this.usuario = data.usuario;
        this.formDatos.patchValue(this.usuario);
      });

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


  updateUsuario() {
    this.usuarioSrv.updateUsuario(this.usuario.id_usuario, this.formDatos.value)
      .subscribe(usuario => {
        this.usuario = usuario;
        this.formDatos.patchValue(this.usuario);

        this.snackBar.open("Usuario Actualizado", "", {
          duration: 2000,
          panelClass: ["bg-success", "text-white"]
        });

      }, (error) => {
        this.snackBar.open("Ha ocurrido un error de conexión. Inténtelo más tarde", "", {
          duration: 3000,
          panelClass: ["bg-danger", "text-white"]
        });

      });
  }

  updatePassword() {
    this.usuarioSrv.updatePassword(this.usuario.id_usuario, this.formPassword.get("password").value)
      .subscribe(usuario => {

        this.formPassword.reset();

        this.snackBar.open("Su contraseña ha cambiado", "", {
          duration: 2000,
          panelClass: ["bg-success", "text-white"]
        });

      }, (error) => {
        this.snackBar.open("Ha ocurrido un error de conexión. Inténtelo más tarde", "", {
          duration: 3000,
          panelClass: ["bg-danger", "text-white"]
        });

      });
  }

  print() {
    console.log("usuario actual", this.usuario);
  }

}
