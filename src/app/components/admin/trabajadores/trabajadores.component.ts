import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { NuevoTrabajadorDialogoComponent } from 'app/components/admin/nuevo-trabajador-dialogo/nuevo-trabajador-dialogo.component';
import { EditarTrabajadorDialogoComponent } from 'app/components/admin/editar-trabajador-dialogo/editar-trabajador-dialogo.component';

@Component({
  selector: 'app-trabajadores',
  templateUrl: './trabajadores.component.html',
  styleUrls: ['./trabajadores.component.scss']
})
export class TrabajadoresComponent implements OnInit {
  loading: boolean;
  obras: any = [];

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.data
      .subscribe((data: { obras: any[] }) => {
        this.obras = data.obras;
      });
    //this.loading = true;
  }


  nuevoTrabajador() {
    let dialogRef = this.dialog.open(NuevoTrabajadorDialogoComponent, {
      data: {
      },
      width: "600px"
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  editarTrabajador() {
    let dialogRef = this.dialog.open(EditarTrabajadorDialogoComponent, {
      data: {
      },
      width: "600px"
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  asignarTrabajadores() {
    this.router.navigate(["/asignar-trabajadores"]);
  }


}
