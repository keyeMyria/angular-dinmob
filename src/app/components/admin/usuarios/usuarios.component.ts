import { Component, OnInit } from '@angular/core';
import { Usuario } from "app/model/usuario";
import { UsuarioService } from "app/services/usuario.service";
import { MatDialog, MatDialogRef, MatSnackBar } from "@angular/material";
import { CambiarPasswordDialogoComponent } from "app/components/admin/cambiar-password-dialogo/cambiar-password-dialogo.component";
import { ConfirmarBorradoDialogoComponent } from "app/components/admin/confirmar-borrado-dialogo/confirmar-borrado-dialogo.component";
import { EditarUsuarioDialogoComponent } from "app/components/admin/editar-usuario-dialogo/editar-usuario-dialogo.component";
import { CrearUsuarioDialogoComponent } from "app/components/admin/crear-usuario-dialogo/crear-usuario-dialogo.component";

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {
  loading: boolean;
  usuarios: Usuario[];
  roles: any[];
  selectedOption: string;


  constructor(public dialog: MatDialog, private usuarioSrv: UsuarioService, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.loading = true;
    console.log("get roles");
    this.usuarioSrv.getRoles()
      .subscribe(res => this.roles = res);

    this.usuarioSrv.getUsuarios()
      .subscribe(res => {
        this.usuarios = res;
        this.loading = false;
      });
  }

  changePassword(usuario: Usuario) {

    let newpassword: string;

    let dialogRef = this.dialog.open(CambiarPasswordDialogoComponent, {
      data: {
        usuario: usuario,
        password: newpassword
      }
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result === true) {
        this.loading = true;

        this.usuarioSrv.updatePassword(usuario.id_usuario, newpassword)
          .subscribe(res => {

            this.loading = false;
            this.snackBar.open("Usuario Actualizado", "Cerrar", {
              duration: 2000
            });

          });


      }

    });

  }

  delUsuario(usuario: Usuario) {

    let newpassword: string;

    let dialogRef = this.dialog.open(ConfirmarBorradoDialogoComponent, {
      data: {
        title: "Eliminar usuario",
        content: `¿Desea eliminar el usuario: ${usuario.nombre}?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result === true) {
        this.loading = true;

        this.usuarioSrv.delUsuario(usuario.id_usuario)
          .subscribe(res => {

            if (res.count === 1) {

              let i = this.usuarios.indexOf(usuario);
              this.usuarios.splice(i, 1);

              this.loading = false;
              this.snackBar.open("Usuario Eliminado", "Cerrar", {
                duration: 2000
              });

            } else {
              this.snackBar.open("Ha ocurrido un error", "Cerrar", {
                duration: 2000
              });
            }

          });


      }

    });

  }


  editarUsuario(usuario: Usuario) {

    let copia = Usuario.copiar(usuario);

    let dialogRef = this.dialog.open(EditarUsuarioDialogoComponent, {
      data: {
        usuario: copia,
        roles: this.roles
      }
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result === true) {
        this.loading = true;

        this.usuarioSrv.updateUsuario(usuario.id_usuario, copia)
          .subscribe(res => {

            let i = this.usuarios.indexOf(usuario);
            this.usuarios[i] = res;
            this.loading = false;
            this.snackBar.open("Usuario Actualizado", "Cerrar", {
              duration: 2000
            });

          });


      }

    });


  }

  agregarUsuario(): void {
    let usuario = new Usuario();

    let dialogRef = this.dialog.open(CrearUsuarioDialogoComponent, {
      data: {
        usuario: usuario,
        roles: this.roles
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {

        console.log("usuario", usuario);
        this.usuarioSrv.createUsuario(usuario)
          .subscribe(res => {
            console.log("response", res);
            let nuevoUsuario = res;//new Usuario();
           //nuevoUsuario.id_usuario = res;
           // nuevoUsuario.nombre = usuario.nombre;
            this.usuarios.push(nuevoUsuario);

          });
        }

        
      });

  }





}
