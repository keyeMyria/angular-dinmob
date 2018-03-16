import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';
import { FormatoDialogoComponent } from '../formato-dialogo/formato-dialogo.component';
import { MatDialog } from '@angular/material';
import { FileUploader, FileItem, FileLikeObject } from 'ng2-file-upload';
import { PrototiposService } from '../../../services/prototipos.service';
import { AuthService } from 'app/services/auth.service';

@Component({
  selector: 'app-importar-prototipo',
  templateUrl: './importar-prototipo.component.html',
  styleUrls: ['./importar-prototipo.component.scss']
})
export class ImportarPrototipoComponent implements OnInit {
  obras: any[] = [];
  obra_selected: string = "";
  form: FormGroup;

  partidas: any = [];

  @ViewChild("inputFile") inputFile: any;
  uploader: FileUploader;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private prototipoSrv: PrototiposService,
    private auth: AuthService
  ) {
    this.form = this.fb.group({

      nombre_prototipo: [null, Validators.required],
      obra: [null, Validators.required],
    });


    //uploader
    this.uploader = new FileUploader({
      url: this.prototipoSrv.getUploadPrototipoURL(),
      authToken: "Bearer " + this.auth.getToken(),
      queueLimit: 1,
      removeAfterUpload: true
    });

    this.uploader.onCompleteAll = () => {
      //console.log(this.inputFile.nativeElement.files);
      this.inputFile.nativeElement.value = "";
      //console.log(this.inputFile.nativeElement.files);

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
        //this.result = { error: result };


      } else {
        //this.result = false;
        //this.result = { error: "Ha ocurrido un error de conexión. Inténtelo más tarde" }
      }
    };

    this.uploader.onSuccessItem = (item: any, response: any, status: any, headers: any) => {
      //console.log("success item", item);
      //console.log("success response", response);
      //console.log("success status", status);
      //console.log("success headers", headers);

      let respuesta= JSON.parse(response);

      if (status == 200) {
        this.partidas= respuesta.partidas;
        
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

  ngOnInit() {
    this.route.data
      .subscribe((data: { obras: any[] }) => {
        this.obras = data.obras;
      });
  }

  cargarObra(id_obra) {

    if (id_obra) {
      this.router.navigate([".", { obra: id_obra }]);
    } else {
      this.router.navigate([".", {}]);
    }

  }

  guardar() {
    console.log("ok", this.form.value)
  }

  gotoFormato() {

    let dialogRef = this.dialog.open(FormatoDialogoComponent, {
      data: {
      },
      width: "500px"
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

}
