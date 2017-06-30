import { Injectable } from '@angular/core';
import { Http } from "@angular/http";

@Injectable()
export class ClientesService {

  constructor(
    private http: Http
  ) { }

  getCliente(id: number) {

  }

  getClientes() {
    return this.http.get('assets/data/clientes.json')
      .map(response => response.json());
  }

}
