import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FileUploader, FileItem, FileLikeObject } from 'ng2-file-upload';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { LoteEstadoVentaService } from '../../../services/lote-estado-venta.service';
import { LotesService } from '../../../services/lotes.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-foto-partida-dialogo',
  templateUrl: './foto-partida-dialogo.component.html',
  styleUrls: ['./foto-partida-dialogo.component.scss']
})
export class FotoPartidaDialogoComponent {
  @ViewChild("inputFile") inputFile: any;
  uploader: FileUploader;

  descripcion: string = "";
  result: any;

  currentFile: File;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<FotoPartidaDialogoComponent>,
    private loteSrv: LotesService,
    private auth: AuthService

  ) {


    this.uploader = new FileUploader({
      url: this.loteSrv.getUploadFotoURL(),
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
        descripcion: this.descripcion,
        id_lote: this.data.id_lote,
        id_partida: this.data.id_partida
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
        //this.data.documentos.push(JSON.parse(response).doc);
        this.data.partida.num_fotos = Number(this.data.partida.num_fotos) + 1;
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
        //this.uploader.addToQueue(this.inputFile.nativeElement.files);
        this.uploader.addToQueue([this.currentFile]);
      }

    };

  }

  //cambia el tamaño de la imagen y la comprime
  getScaledCanvas(image, maxDimension) {

    var thumbCanvas = document.createElement('canvas');
    if (image.width > maxDimension ||
      image.height > maxDimension) {
      if (image.width > image.height) {
        thumbCanvas.width = maxDimension;
        thumbCanvas.height = maxDimension * image.height / image.width;
      } else {
        thumbCanvas.width = maxDimension * image.width / image.height;
        thumbCanvas.height = maxDimension;
      }
    } else {
      thumbCanvas.width = image.width;
      thumbCanvas.height = image.height;
    }
    thumbCanvas.getContext('2d').drawImage(image, 0, 0, image.width, image.height,
      0, 0, thumbCanvas.width, thumbCanvas.height);
    return thumbCanvas;
  }


  // devuelve una promesa con el Blob de 
  // la imagen aplicando un cambio de tamaño y calidad
  generateImage():Promise<Blob> {

    //console.log("generateImage");

    return new Promise((resolve, reject) => {

      const createBlob = (url) => {

        let image = new Image();

        image.onload = () => {

          let maxFullDimension = 1024;
          let fullCanvas = this.getScaledCanvas(image, maxFullDimension);
          fullCanvas.toBlob(resolve, 'image/jpeg', 0.8);

        };

        image.src = url;

      };


      let reader = new FileReader();
      reader.onload = function () {
        //e.target.result;                          
        return createBlob(reader.result);
      };      

      reader.readAsDataURL(this.currentFile);

    });



  }


  changeImage(event: Event, fileList: FileList) {
    //console.log("changeImage");
    this.currentFile = fileList[0];
  }

  uploadImage() {
    //console.log("uploadImage");

    this.generateImage()
      .then((blob:any) => {
        blob.name = this.currentFile.name;
        //console.log("blob", blob);
        this.uploader.addToQueue([blob]);

        this.uploader.uploadAll();
        
      });

  }




}
