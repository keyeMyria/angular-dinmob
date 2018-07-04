import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { TareaService } from '../../../services/tarea.service';

@Component({
  selector: 'app-editar-tarea-dialogo',
  templateUrl: './editar-tarea-dialogo.component.html',
  styleUrls: ['./editar-tarea-dialogo.component.scss']
})
export class EditarTareaDialogoComponent implements OnInit {
  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditarTareaDialogoComponent>,
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
    console.log("datos", this.form.value);
    this.tareaSrv.updateTarea(this.data.tarea.id_tarea, this.form.value)
      .subscribe(tarea => {

        let i = this.data.tareas.indexOf(this.data.tarea);
        this.data.tareas[i] = tarea;
        this.dialogRef.close(true);

      },
        (error) => {
          this.dialogRef.close({ error: "Ha ocurrido un error. Vuelva a intentarlo más tarde." });
        });
  }

}
