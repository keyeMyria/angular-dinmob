import { Component, OnInit } from '@angular/core';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

@Component({
  selector: 'app-editar-insumo-dialogo',
  templateUrl: './editar-insumo-dialogo.component.html',
  styleUrls: ['./editar-insumo-dialogo.component.scss']
})
export class EditarInsumoDialogoComponent implements OnInit {

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
