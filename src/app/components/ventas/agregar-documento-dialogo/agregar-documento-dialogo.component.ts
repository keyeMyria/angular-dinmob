import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FileUploader, FileItem, FileLikeObject } from 'ng2-file-upload';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AuthService } from 'app/services/auth.service';
import { ClientesService } from 'app/services/clientes.service';

@Component({
  selector: 'app-agregar-documento-dialogo',
  templateUrl: './agregar-documento-dialogo.component.html',
  styleUrls: ['./agregar-documento-dialogo.component.scss']
})
export class AgregarDocumentoDialogoComponent {
  @ViewChild("inputFile") inputFile: any;
  uploader: FileUploader;

  nombre: string;

  result: any;


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AgregarDocumentoDialogoComponent>,
    private clienteSrv: ClientesService,
    private auth: AuthService,
  ) {

    this.uploader = new FileUploader({
      url: this.clienteSrv.getUploadDocumentClienteURL(),
      authToken: "Bearer " + this.auth.getToken(),
      queueLimit: 1,
      removeAfterUpload: true
    });

    this.uploader.onCompleteAll = () => {
      //console.log(this.inputFile.nativeElement.files);
      this.inputFile.nativeElement.value = "";
      //console.log(this.inputFile.nativeElement.files);
      this.dialogRef.close(this.result);
    };

    this.uploader.onBuildItemForm = (item: any, form: any) => {
      //se añaden parametros
      this.uploader.options.additionalParameter = {
        nombre: this.nombre,
        id_cliente: this.data.cliente.id_cliente,
        conyuge: this.data.conyuge
      };

    };

    this.uploader._onErrorItem = (item: any, response: any, status: any, headers: any) => {

      //console.log("success item", item);
      console.log("success response", response);
      console.log("success status", status);
      console.log("success headers", headers);


      if (status == 400) {

        this.result = "";

        let errores= JSON.parse(response);
        errores.forEach(error => {
          this.result += " " + error;
        });
        console.log("result", this.result);


      } else {
        this.result = false;
      }
    };

    this.uploader.onSuccessItem = (item: any, response: any, status: any, headers: any) => {
      //console.log("success item", item);
      //console.log("success response", response);
      //console.log("success status", status);
      //console.log("success headers", headers);

      if (status == 200) {
        this.data.documentos.push(JSON.parse(response).doc);
        this.result = true;
      }

    };

    this.uploader.onAfterAddingFile = (file: FileItem) => {
      // console.log("onAfterAddingFile", file);
    };

    this.uploader.onWhenAddingFileFailed = (item: FileLikeObject, filter: any, options: any) => {
      //console.log("onWhenAddingFileFailed", item, filter, options );

      //si falla porque ya tenemos un archivo, entonces lo reemplazamos
      if (filter.name == "queueLimit") {
        this.uploader.clearQueue();
        this.uploader.addToQueue(this.inputFile.nativeElement.files);
      }

    };





  }

  debug() {
    console.log(this.inputFile.nativeElement.files, this.inputFile.nativeElement.value);
    console.log(this.uploader);


  }



}
