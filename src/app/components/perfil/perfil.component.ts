import { Component, OnInit } from '@angular/core';
import { AuthService } from "app/services/auth.service";
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
  usuario: any;


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
    this.formDatos.patchValue(this.usuario);
  

    this.route.data
      .subscribe((data: { obras: any[] }) => {        
        this.obras = data.obras;
      });

  }


  updateUsuario() {
    console.log("update", this.formDatos.value);
    this.usuarioSrv.updateUsuario(this.usuario.id_usuario, this.formDatos.value)
      .subscribe(usuario => {
        this.usuario = usuario;
        console.log("datos", usuario);
        
        this.auth.setInLocalStorage('usuario', JSON.stringify(usuario));        
        //actualizamos los datos
      
      },
      (error) => {
        //recuperamos los datos
       
      });
  }

  updatePassword() {
    console.log("Not implemented");
  }

  print() {
    console.log("usuario actual", this.usuario);
  }

}
