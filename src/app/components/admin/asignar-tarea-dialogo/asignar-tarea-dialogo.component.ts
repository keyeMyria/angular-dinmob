import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { TareaService } from '../../../services/tarea.service';

@Component({
  selector: 'app-asignar-tarea-dialogo',
  templateUrl: './asignar-tarea-dialogo.component.html',
  styleUrls: ['./asignar-tarea-dialogo.component.scss']
})
export class AsignarTareaDialogoComponent implements OnInit {
  form: FormGroup;


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AsignarTareaDialogoComponent>,
    private fb: FormBuilder,
    private tareaSrv: TareaService
  ) {
    this.form = this.fb.group({
      id_usuario: ["", Validators.required],
      fecha: ["", Validators.required],
      mensaje_tarea: ["", Validators.required],
    });
  }

  ngOnInit() {
  }

  guardar() {
    console.log("tarea", this.form.value);
    this.tareaSrv.createTarea(this.form.value)
      .subscribe(tarea => {
        this.data.tareas.push(tarea);
        this.dialogRef.close(true);

      },
        (error) => {
          this.dialogRef.close({ error: "Ha ocurrido un error de conexión. Inténtelo más tarde" });
        });
  }

}
