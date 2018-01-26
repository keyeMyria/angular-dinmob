import { Component, OnInit } from '@angular/core';
import { ObrasService } from "app/services/obras.service";
import { AgregarPrototipoDialogoComponent } from "app/components/admin/agregar-prototipo-dialogo/agregar-prototipo-dialogo.component";
import { MatDialog, MatSnackBar } from "@angular/material";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";

import { PrototiposService } from 'app/services/prototipos.service';
import { Prototipo } from "app/model/prototipo";
import { AuthService } from 'app/services/auth.service';
import { EditarNombrePrototipoDialogoComponent } from 'app/components/admin/editar-nombre-prototipo-dialogo/editar-nombre-prototipo-dialogo.component';


//import 'rxjs/add/observable/of';
import { of } from 'rxjs/observable/of';



@Component({
  selector: 'app-prototipos',
  templateUrl: './prototipos.component.html',
  styleUrls: ['./prototipos.component.scss']
})
export class PrototiposComponent implements OnInit {
  loading: boolean;
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

    this.route.data
      .subscribe((data: { obras: any[] }) => {
        //console.log("resusltado resolve ", data);
        this.obras = data.obras;
      });

    this.loading = true;

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
      width: '500px'
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

  cambiarNombre(prototipo) {
    console.log("prototipo", prototipo);
    let dialogRef = this.dialog.open(EditarNombrePrototipoDialogoComponent, {
      data: {
        prototipo: prototipo,
      },
      width: "500px"
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
      }
      console.log('The dialog was closed');
    });
  }

}
