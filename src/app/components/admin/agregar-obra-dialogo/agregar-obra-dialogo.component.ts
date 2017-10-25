import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { Obra } from "app/model/obra";
import { NgForm } from "@angular/forms";
import { ObrasService } from "app/services/obras.service";

@Component({
  selector: 'app-agregar-obra-dialogo',
  templateUrl: './agregar-obra-dialogo.component.html',
  styleUrls: ['./agregar-obra-dialogo.component.scss']
})
export class AgregarObraDialogoComponent implements OnInit {
  @ViewChild('formCreateObra') formCreateObra: NgForm;

  obra: Obra; //= new Obra();

  constructor(
    private obrasSrv: ObrasService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AgregarObraDialogoComponent>
  ) { }

  ngOnInit() {
    this.obra=this.data.obra;
  }


}
