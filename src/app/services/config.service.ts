import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {

  //cambiar MANUALMENTE
  prod: boolean = false;

  //se usa en todos los servicios
  api_url: string = "/api/index.php/";

  /*  upload_colonias_url: string = "colonias/upload_excel";
   upload_secciones_url: string = "secciones/upload_excel";
   upload_registros_url: string = "registros/upload_excel"; */


  constructor() {

    let localhost;
    if (this.prod) {
      //produccion ->subdominio
      localhost = "";

    } else {
      //desarrollo -> localhost
      localhost = "http://localhost:8080/dinmob";
      //localhost = "http://192.168.0.108:8080/dinmob";

    }
    this.api_url = localhost + this.api_url;
    /*   this.upload_colonias_url = this.api_url + this.upload_colonias_url;
      this.upload_secciones_url = this.api_url + this.upload_secciones_url;
      this.upload_registros_url = this.api_url + this.upload_registros_url; */

  }


}
