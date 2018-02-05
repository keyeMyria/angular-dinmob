import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
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

    this.uploader.onSuccessItem = (item: any, response: any, statu: any, headers: any) => {
      //console.log("success item", item);
      //console.log("success response", response);
      //console.log("success status", status);
      //console.log("success headers", headers);

    };

  }



}
