import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-ver-salida-dialogo',
  templateUrl: './ver-salida-dialogo.component.html',
  styleUrls: ['./ver-salida-dialogo.component.scss']
})
export class VerSalidaDialogoComponent implements OnInit {
  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<VerSalidaDialogoComponent>,
    private fb: FormBuilder,
    private route: ActivatedRoute,
  ) {

    this.form = this.fb.group({
      folio: [data.datos.folio],
      num_vale: [data.datos.num_vale],
      tipo_salida: [data.datos.tipo],
      fecha: [data.datos.fecha],
      obra_destino: [data.datos.obra_destino],
      nombre_lote: [data.datos.nombre_lote],
      nombre_partida: [data.datos.nombre_partida],
      autoriza: [data.datos.autoriza],
      entrega: [data.datos.entraga],
      nombre_trabajador: [data.datos.nombre_trabajador],
      notas: [data.datos.notas],



    });

  }

  ngOnInit() {

   /*  this.salidasSrv.getSalida(this.data.salida.id_salida)
      .subscribe(res => {
        console.log("salida OK", res);
        this.datos = res.datos;
        this.insumos = res.insumos;
        //this.form.patchValue(this.salida.datos);
      }); */
  }

}
