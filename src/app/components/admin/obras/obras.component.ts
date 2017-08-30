import { Component, OnInit } from '@angular/core';
import { ObrasService } from "app/services/obras.service";
import {MdDialog, MdDialogRef, MD_DIALOG_DATA} from '@angular/material';
import { AgregarCategoriaDialogoComponent } from "app/components/admin/agregar-categoria-dialogo/agregar-categoria-dialogo.component";

@Component({
  selector: 'app-obras',
  templateUrl: './obras.component.html',
  styleUrls: ['./obras.component.scss']
})
export class ObrasComponent implements OnInit {
  obras: any[];

  constructor(private obrasService: ObrasService, public dialog: MdDialog) { }

  ngOnInit() {
    this.obrasService.getAllObras()
      .subscribe(response => this.obras = response);
  }

  agregarCategoria(): void {
    let dialogRef = this.dialog.open(AgregarCategoriaDialogoComponent, {
      width: '250px',      
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
