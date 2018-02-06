import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';
import { ClientesService } from 'app/services/clientes.service';


@Component({
  selector: 'app-editar-documento-dialogo',
  templateUrl: './editar-documento-dialogo.component.html',
  styleUrls: ['./editar-documento-dialogo.component.scss']
})
export class EditarDocumentoDialogoComponent implements OnInit {
  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditarDocumentoDialogoComponent>,
    private fb: FormBuilder,
    private clienteSrv: ClientesService
  ) {
    this.form = this.fb.group({
      nombre: [data.doc.nombre, Validators.required]
    });
  }

  ngOnInit() {
  }

  guardar() {
    console.log("guardar", this.form.value);

    this.clienteSrv.updateDocumento(this.data.doc.id_documento, this.form.value)
      .subscribe(documento => {
        
        let i= this.data.documentos.indexOf(this.data.doc);
        this.data.documentos[i]=documento;

        this.dialogRef.close(true);

      }, (error) => {

        this.dialogRef.close(error);
      });

  }

}
