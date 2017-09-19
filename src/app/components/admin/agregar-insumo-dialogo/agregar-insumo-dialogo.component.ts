import { Component, OnInit } from '@angular/core';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

@Component({
  selector: 'app-agregar-insumo-dialogo',
  templateUrl: './agregar-insumo-dialogo.component.html',
  styleUrls: ['./agregar-insumo-dialogo.component.scss']
})
export class AgregarInsumoDialogoComponent implements OnInit {

  currencyMask = createNumberMask({
    allowDecimal: true
  });
  numberMask = createNumberMask({
    allowDecimal: true,
    prefix: '',
    decimalLimit: 6,
  });


  constructor() { }

  ngOnInit() {
  }

}
