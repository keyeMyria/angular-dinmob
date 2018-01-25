import { Component, OnInit } from '@angular/core';
import { Usuario } from "app/model/usuario";
import { UsuarioService } from "app/services/usuario.service";
import { MatDialog, MatDialogRef, MatSnackBar, Sort } from "@angular/material";
import { CambiarPasswordDialogoComponent } from "app/components/admin/cambiar-password-dialogo/cambiar-password-dialogo.component";
import { ConfirmarBorradoDialogoComponent } from "app/components/admin/confirmar-borrado-dialogo/confirmar-borrado-dialogo.component";
import { EditarUsuarioDialogoComponent } from "app/components/admin/editar-usuario-dialogo/editar-usuario-dialogo.component";
import { CrearUsuarioDialogoComponent } from "app/components/admin/crear-usuario-dialogo/crear-usuario-dialogo.component";
import { log } from 'util';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {
  loading: boolean;
  usuarios: Usuario[];
  usuariosOrdenados: Usuario[];
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
        this.usuariosOrdenados= this.usuarios.slice();
        this.loading = false;
      });
  }

  changePassword(usuario) {

    let dialogRef = this.dialog.open(CambiarPasswordDialogoComponent, {
      data: {
        usuario: usuario
      },
      width: "450px"
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result === true) {

        this.snackBar.open("Usuario Actualizado", "Cerrar", {
          duration: 2000
        });

      } else if (result.error) {

        this.snackBar.open(result.error, "Cerrar", {
          duration: 3000
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
                duration: 3000
              });
            }

          });


      }

    });

  }

  editarUsuario(usuario) {

    let dialogRef = this.dialog.open(EditarUsuarioDialogoComponent, {
      data: {
        usuario: usuario,
        usuarios: this.usuarios
      },
      width: "450px"
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result === true) {

        this.snackBar.open("Usuario Actualizado", "Cerrar", {
          duration: 2000,
          //panelClass:['bg-danger', 'text-white']
        });

      } else if (result.error) {

        this.snackBar.open(result.error, "Cerrar", {
          duration: 3000
        });

      }


    });


  }

  agregarUsuario(): void {


    let dialogRef = this.dialog.open(CrearUsuarioDialogoComponent, {
      data: {
        roles: this.roles,
        usuarios: this.usuarios
      },
      width: "450px"
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result === true) {

        this.snackBar.open("Usuario Agregado", "Cerrar", {
          duration: 2000
        });

      } else if (result.error) {

        this.snackBar.open(result.error, "Cerrar", {
          duration: 3000
        });

      }


    });

  }

  ordenarDatos(sort: Sort) {
    console.log("ordenarDatos", sort);

    const data = this.usuarios.slice();
    if (!sort.active || sort.direction == '') {
      this.usuariosOrdenados = data;
      return;
    }

    this.usuariosOrdenados = data.sort((a, b) => {
      let isAsc = sort.direction == 'asc';
      switch (sort.active) {
        case 'id': return compare(+a.id_usuario, +b.id_usuario, isAsc);
        case 'nombre': return compare(a.nombre, b.nombre, isAsc);
        case 'email': return compare(a.email, b.email, isAsc);
        case 'rol': return compare(a.tipo_usuario, b.tipo_usuario, isAsc);      
        default: return 0;
      }
    });

  }

}

function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

