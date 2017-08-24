import { Component, OnInit, Inject } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef } from "@angular/material";

@Component({
  selector: 'app-confirmar-borrado-dialogo',
  templateUrl: './confirmar-borrado-dialogo.component.html',
  styleUrls: ['./confirmar-borrado-dialogo.component.scss']
})
export class ConfirmarBorradoDialogoComponent implements OnInit {

  constructor(
    @Inject(MD_DIALOG_DATA) public data: any,
    public dialogRef: MdDialogRef<ConfirmarBorradoDialogoComponent>
  ) { }

  ngOnInit() {
  }

}
