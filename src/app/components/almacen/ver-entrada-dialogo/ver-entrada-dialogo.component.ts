import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

@Component({
  selector: 'app-ver-entrada-dialogo',
  templateUrl: './ver-entrada-dialogo.component.html',
  styleUrls: ['./ver-entrada-dialogo.component.scss']
})
export class VerEntradaDialogoComponent implements OnInit {
  numberMask = createNumberMask({
    allowDecimal: true,
    prefix: '',
    decimalLimit: 2
  });
  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<VerEntradaDialogoComponent>,
    private fb: FormBuilder,
    private route: ActivatedRoute,
  ) {
    this.form = this.fb.group({
      proveedor: [data.datos.proveedor],
      fecha: [data.datos.fecha],
      folio: [data.datos.folio],
      total: [data.datos.total],
      al_contado: [data.datos.al_contado],
      es_factura: [data.datos.es_factura],
      nota: [data.datos.nota]
     



    });
   }

  ngOnInit() {
  }

}
