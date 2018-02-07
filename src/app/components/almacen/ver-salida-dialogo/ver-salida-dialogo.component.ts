import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SalidasService } from 'app/services/salidas.service';

@Component({
  selector: 'app-ver-salida-dialogo',
  templateUrl: './ver-salida-dialogo.component.html',
  styleUrls: ['./ver-salida-dialogo.component.scss']
})
export class VerSalidaDialogoComponent implements OnInit {
  form: FormGroup;
  datos: any;
  insumos: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<VerSalidaDialogoComponent>,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private salidasSrv: SalidasService,
  ) {

    this.form = this.fb.group({
      folio: [data.salida.folio],
      num_vale: [data.salida.num_vale],
      tipo_salida: [data.salida.tipo],
      fecha: [data.salida.fecha],
      obra_destino: [data.salida.obra_destino],
      nombre_lote: [data.salida.nombre_lote],
      nombre_partida: [data.salida.nombre_partida],
      autoriza: [data.salida.autoriza],
      entrega: [data.salida.entraga],
      nombre_trabajador: [data.salida.nombre_trabajador],
     


    });

  }

  ngOnInit() {
  
    this.salidasSrv.getSalida(this.data.salida.id_salida)
      .subscribe(res => {
        console.log("salida OK", res);
        this.datos = res.datos;
        this.insumos = res.insumos;
        //this.form.patchValue(this.salida.datos);
      });
  }

}
