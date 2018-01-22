import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-ver-datos-firma-dialogo',
  templateUrl: './ver-datos-firma-dialogo.component.html',
  styleUrls: ['./ver-datos-firma-dialogo.component.scss']
})
export class VerDatosFirmaDialogoComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<VerDatosFirmaDialogoComponent>
  ) { }

  ngOnInit() {
  }

}
