import { Component, OnInit } from '@angular/core';
import { ObrasService } from "app/services/obras.service";
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { AgregarObraDialogoComponent } from "app/components/admin/agregar-obra-dialogo/agregar-obra-dialogo.component";
import { Obra } from "app/model/obra";

@Component({
  selector: 'app-obras',
  templateUrl: './obras.component.html',
  styleUrls: ['./obras.component.scss']
})
export class ObrasComponent implements OnInit {
  obras: any[];

  constructor(private obrasSrv: ObrasService, public dialog: MdDialog) { }

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
        this.obrasSrv.addObra([], null, obra.nombre, null)
          .subscribe(res => {
            console.log("response", res);
            let nuevaObra = new Obra();
            nuevaObra.id_obra = res;
            nuevaObra.nombre = obra.nombre;
            this.obras.push(nuevaObra);


          });
      }


      console.log('The dialog was closed');
    });
  }

}
