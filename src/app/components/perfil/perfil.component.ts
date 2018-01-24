import { Component, OnInit } from '@angular/core';
import { AuthService } from "app/services/auth.service";
import { Usuario } from "app/model/usuario";
import { Obra } from "app/model/obra";
import { UsuarioService } from 'app/services/usuario.service';
import { ObrasService } from 'app/services/obras.service';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {


  formDatos: FormGroup;
  formPassword: FormGroup;
  obras: Obra[];
  usuario: Usuario;


  constructor(
    private auth: AuthService,
    private usuarioSrv: UsuarioService,
    private obraSrv: ObrasService,
    private fb: FormBuilder,
    private route: ActivatedRoute
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
    this.usuario = this.auth.getUsuario();
    console.log("ok", this.usuario);
    this.formDatos.patchValue(this.usuario);
    //this.copiarUsuario();
    this.route.data
      .subscribe((data: { obras: any[] }) => {
        //console.log("resusltado resolve ", data);
        this.obras = data.obras;
      });

  }

  /*   private copiarUsuario() {
      this.copia.nombre = this.usuario.nombre;
      this.copia.email = this.usuario.email;
      this.copia.id_obra_default = this.usuario.id_obra_default;
    } */





  updateUsuario() {
    console.log("update", this.formDatos.value);
    this.usuarioSrv.updateUsuario(this.usuario.id_usuario, this.formDatos.value)
      .subscribe(usuario => {
        this.usuario = usuario;
        console.log("datos", usuario);
        this.auth.setInLocalStorage('usuario', JSON.stringify(usuario));        
        //actualizamos los datos
        //this.copiarUsuario();
      },
      (error) => {
        //recuperamos los datos
        //this.copiarUsuario();
      });
  }

  updatePassword() {
    console.log("Not implemented");
  }

  print() {
    console.log("usuario actual", this.usuario);
  }

}
