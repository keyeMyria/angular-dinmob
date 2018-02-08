import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {

  //cambiar MANUALMENTE
  prod: boolean = false;

  //se usa en todos los servicios
  api_url: string = "/api/index.php/";

 constructor() {

    let localhost;
    if (this.prod) {
      //produccion ->subdominio
      localhost = "";
      //localhost="/ramiro";
    } else {
      //desarrollo -> localhost
      localhost = "http://localhost:8080/dinmob";
      //localhost = "http://192.168.0.108:8080/dinmob";

    }
    this.api_url = localhost + this.api_url;

  }


}
