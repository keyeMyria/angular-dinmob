import { Component, OnInit } from '@angular/core';
import { ObrasService } from "app/services/obras.service";
import { AgregarPrototipoDialogoComponent } from "app/components/admin/agregar-prototipo-dialogo/agregar-prototipo-dialogo.component";
import { MatDialog, MatSnackBar } from "@angular/material";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { CambiarNombrePrototipoDialogoComponent } from "app/components/admin/cambiar-nombre-prototipo-dialogo/cambiar-nombre-prototipo-dialogo.component";
import { PrototiposService } from 'app/services/prototipos.service';
import { Prototipo } from "app/model/prototipo";
import { AuthService } from 'app/services/auth.service';
import { Usuario } from 'app/model/usuario';

//import 'rxjs/add/observable/of';
import { of } from 'rxjs/observable/of';


@Component({
  selector: 'app-prototipos',
  templateUrl: './prototipos.component.html',
  styleUrls: ['./prototipos.component.scss']
})
export class PrototiposComponent implements OnInit {
  loading: boolean;
  usuario: Usuario;
  obras: any = [];
  obra: any = {
    datos: {}
  };
  obra_selected: string = "";
  prototipos: Prototipo[];

  constructor(
    public snackBar: MatSnackBar,
    public prototipoSrv: PrototiposService,
    private obraSrv: ObrasService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService,
  ) { }

  ngOnInit() {
    this.loading = true;
    this.usuario = this.auth.getUsuario();

    this.obraSrv.getObrasUsuario(this.usuario.id_usuario)
      .subscribe(obras => {
        this.obras = obras;
      });




    this.route.paramMap
      .switchMap((params: ParamMap) => {
        if (params.has("obra")) {
          this.obra_selected = params.get("obra");
          return this.prototipoSrv.getPrototiposObra(params.get("obra"));
        } else {
          return of([]);
        }
      }).subscribe(prototipos => {
        console.log("prototipos", prototipos);
        this.prototipos = prototipos;
        this.loading = false;

      });
  }

  cargarObra(id_obra) {

    if (id_obra) {
      this.router.navigate([".", { obra: id_obra }]);
    } else {
      this.router.navigate([".", {}]);
    }

  }

  agregarPrototipo() {
    let dialogRef = this.dialog.open(AgregarPrototipoDialogoComponent, {
      data: {},
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
      }
      console.log('The dialog was closed');
    });
  }

  editarPrototipo(prototipo) {
    this.router.navigate(["/editar-prototipo", prototipo.id_prototipo]);
  }

  cambiarNombre() {
    let dialogRef = this.dialog.open(CambiarNombrePrototipoDialogoComponent, {
      data: {},
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
      }
      console.log('The dialog was closed');
    });
  }

}
