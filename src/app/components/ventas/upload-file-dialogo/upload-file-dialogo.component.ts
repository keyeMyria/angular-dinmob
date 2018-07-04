import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FileUploader, FileItem, FileLikeObject } from 'ng2-file-upload';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AuthService } from 'app/services/auth.service';
import { VentasPagosService } from 'app/services/ventas-pagos.service';

@Component({
  selector: 'app-upload-file-dialogo',
  templateUrl: './upload-file-dialogo.component.html',
  styleUrls: ['./upload-file-dialogo.component.scss']
})
export class UploadFileDialogoComponent {
  @ViewChild("inputFile") inputFile: any;
  uploader: FileUploader;
  result: any;


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<UploadFileDialogoComponent>,
    private pagoSrv: VentasPagosService,
    private auth: AuthService,
  ) {

    this.uploader = new FileUploader({
      url: this.pagoSrv.getUploadComprobanteURL(),
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
        id_pago: this.data.pago.id_pago,
        id_compra:this.data.pago.id_compra
        //id_cliente: this.data.pago.id_cliente,
        //id_lote: this.data.pago.id_lote

      };

    };

    this.uploader._onErrorItem = (item: any, response: any, status: any, headers: any) => {

      //console.log("success item", item);
      //console.log("success response", response);
      //console.log("success status", status);
      //console.log("success headers", headers);


      if (status == 400) {

        let result = "";

        let errores = JSON.parse(response);
        errores.forEach(error => {
          result += " " + error;
        });
        //console.log("result", result);
        this.result = { error: result };


      } else {
        //this.result = false;
        this.result = { error: "Ha ocurrido un error de conexión. Inténtelo más tarde" }
      }
    };

    this.uploader.onSuccessItem = (item: any, response: any, status: any, headers: any) => {
      //console.log("success item", item);
      //console.log("success response", response);
      //console.log("success status", status);
      //console.log("success headers", headers);

      if (status == 200) {
        this.data.pago.url = JSON.parse(response).url;
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
