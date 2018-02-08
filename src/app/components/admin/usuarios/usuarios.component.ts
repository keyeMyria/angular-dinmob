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
  usuarios: any;
  usuariosOrdenados: Usuario[];
  roles: any;
  selectedOption: string;


  constructor(public dialog: MatDialog, private usuarioSrv: UsuarioService, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.loading = true;

    this.usuarioSrv.getRoles()
      .subscribe(res => this.roles = res);

    this.usuarioSrv.getUsuarios()
      .subscribe(res => {
        this.usuarios = res;
        this.usuariosOrdenados = this.usuarios.slice();
        this.loading = false;
      });
  }

  changePassword(usuario) {

    let dialogRef = this.dialog.open(CambiarPasswordDialogoComponent, {
      data: {
        usuario: usuario
      },
      width: "500px"
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result === true) {

        this.snackBar.open("Usuario Actualizado", "", {
          duration: 2000,
          panelClass: ["bg-success", "text-white"]
        });

      } else if (result.error) {

        this.snackBar.open(result.error, "", {
          duration: 3000,
          panelClass: ["bg-danger", "text-white"]
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
      },
      width: "500px"
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result === true) {
        this.loading = true;

        this.usuarioSrv.delUsuario(usuario.id_usuario)
          .subscribe((res: any) => {
            this.loading = false;
            if (res.count === 1) {

              let i = this.usuarios.indexOf(usuario);
              this.usuarios.splice(i, 1);
              let j = this.usuariosOrdenados.indexOf(usuario);
              this.usuariosOrdenados.splice(j, 1);


              this.snackBar.open("Usuario Eliminado", "", {
                duration: 2000,
                panelClass: ["bg-success", "text-white"]
              });

            } else {
              this.loading = false;
              this.snackBar.open("Ha ocurrido un error", "", {
                duration: 3000,
                panelClass: ["bg-danger", "text-white"]
              });
            }

          }, (error) => {
            this.loading = false;
            this.snackBar.open("Ha ocurrido un error de conexión. Inténtelo más tarde", "", {
              duration: 3000,
              panelClass: ["bg-danger", "text-white"]
            });
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
      width: "500px"
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result === true) {

        this.snackBar.open("Usuario Actualizado", "", {
          duration: 2000,
          panelClass: ["bg-success", "text-white"]
        });

      } else if (result.error) {

        this.snackBar.open(result.error, "", {
          duration: 3000,
          panelClass: ["bg-danger", "text-white"]
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
      width: "500px"
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result === true) {

        this.snackBar.open("Usuario Agregado", "", {
          duration: 2000,
          panelClass: ["bg-success", "text-white"]
        });

      } else if (result.error) {

        this.snackBar.open(result.error, "", {
          duration: 3000,
          panelClass: ["bg-danger", "text-white"]
        });

      }


    });

  }

  ordenarDatos(sort: Sort) {
    //console.log("ordenarDatos", sort);

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

