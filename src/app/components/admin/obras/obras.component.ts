import { Component, OnInit } from '@angular/core';
import { ObrasService } from "app/services/obras.service";
import { MdDialog, MdDialogRef, MD_DIALOG_DATA, MdSnackBar } from '@angular/material';
import { AgregarObraDialogoComponent } from "app/components/admin/agregar-obra-dialogo/agregar-obra-dialogo.component";
import { Obra } from "app/model/obra";
import { ConfirmarBorradoDialogoComponent } from "app/components/admin/confirmar-borrado-dialogo/confirmar-borrado-dialogo.component";
import { Router } from "@angular/router";

@Component({
  selector: 'app-obras',
  templateUrl: './obras.component.html',
  styleUrls: ['./obras.component.scss']
})
export class ObrasComponent implements OnInit {
  loading: boolean;
  obras: any[];

  constructor(private router: Router, private obrasSrv: ObrasService, public dialog: MdDialog, public snackBar: MdSnackBar) { }

  ngOnInit() {
    this.obrasSrv.getAllObras()
      .subscribe(response => this.obras = response);
  }

  agregarObra(): void {
    let obra = new Obra();

    let dialogRef = this.dialog.open(AgregarObraDialogoComponent, {
      data: { obra: obra },
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {

        console.log("obra", obra);
        this.obrasSrv.createObra(obra)
          .subscribe(res => {
           
            let nuevaObra =  res;           
            this.obras.push(nuevaObra);


          });
      }


      console.log('The dialog was closed');
    });
  }

  delObra(obra: Obra) {
    
        let newpassword: string;
    
        let dialogRef = this.dialog.open(ConfirmarBorradoDialogoComponent, {
          data: {
            title: "Eliminar Obra",
            content: `¿Desea eliminar la obra: ${obra.nombre}?`
          }
        });
    
        dialogRef.afterClosed().subscribe(result => {
    
          if (result === true) {
            this.loading = true;
    
            this.obrasSrv.delObra(obra.id_obra)
              .subscribe(res => {
    
                if (res.count === 1) {
    
                  let i = this.obras.indexOf(obra);
                  this.obras.splice(i, 1);
    
                  this.loading = false;
                  this.snackBar.open("Obra Eliminada", "Cerrar", {
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

      estructuraObra() {
        this.router.navigate(["/estructura-obra"]);
      }

}
