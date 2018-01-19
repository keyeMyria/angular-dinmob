import { Component, OnInit, Inject } from '@angular/core';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Pago } from 'app/model/pago';

@Component({
  selector: 'app-editar-pago-dialogo',
  templateUrl: './editar-pago-dialogo.component.html',
  styleUrls: ['./editar-pago-dialogo.component.scss']
})
export class EditarPagoDialogoComponent implements OnInit {

  pago:Pago;
  
  numberMask = createNumberMask({
    allowDecimal: true
  });


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditarPagoDialogoComponent>
  ) { }

  ngOnInit() {
    this.pago=this.data.pago;
  }

  onFechaChange() {

  }

}
