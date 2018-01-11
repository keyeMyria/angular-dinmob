import { Component, OnInit } from '@angular/core';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

@Component({
  selector: 'app-nuevo-pago-dialogo',
  templateUrl: './nuevo-pago-dialogo.component.html',
  styleUrls: ['./nuevo-pago-dialogo.component.scss']
})
export class NuevoPagoDialogoComponent implements OnInit {
  numberMask = createNumberMask({
    allowDecimal: true
  });

  constructor() { }

  ngOnInit() {
  }

  onFechaChange() {

  }

}
