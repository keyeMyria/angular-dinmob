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

  nombre:string;


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
      removeAfterUpload: true,
      additionalParameter: {

        /*        id_propiedad: this.data.propiedad.id_propiedad,
               descripion: null,
               es_portada: 0 */
      }

    });

    this.uploader.onCompleteAll = () => {
      console.log(this.inputFile.nativeElement.files);
      this.inputFile.nativeElement.value = "";
      console.log(this.inputFile.nativeElement.files);
    };

    this.uploader.onBuildItemForm = (item: any, form: any) => {
      //se añaden parametros
      this.uploader.options.additionalParameter = {
        nombre: this.nombre,
        id_cliente: this.data.cliente.id_cliente,
        conyuge: this.data.conyuge
      };

    };

    this.uploader.onSuccessItem = (item: any, response: any, statu: any, headers: any) => {
      //console.log("success item", item);
      //console.log("success response", response);
      //console.log("success status", status);
      //console.log("success headers", headers);

    };

    this.uploader.onAfterAddingFile= (file: FileItem)=>{

     // console.log("afterAddingFile", file);
      

    };

    this.uploader.onWhenAddingFileFailed= (item: FileLikeObject, filter: any, options: any)=>{

      console.log("whenAddingFileFailde", item, filter, options );

      //si falla porque ya tenemos un archivo, entonces lo reemplazamos
      if (filter.name=="queueLimit") {
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
