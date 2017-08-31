import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef } from "@angular/material";
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
    @Inject(MD_DIALOG_DATA) public data: any,
    public dialogRef: MdDialogRef<AgregarObraDialogoComponent>
  ) { }

  ngOnInit() {
    this.obra=this.data.obra;
  }


}
