import { Component, OnInit } from '@angular/core';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

@Component({
  selector: 'app-editar-pago-dialogo',
  templateUrl: './editar-pago-dialogo.component.html',
  styleUrls: ['./editar-pago-dialogo.component.scss']
})
export class EditarPagoDialogoComponent implements OnInit {
  numberMask = createNumberMask({
    allowDecimal: true
  });


  constructor() { }

  ngOnInit() {
  }

}
