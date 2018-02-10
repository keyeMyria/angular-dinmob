import { Injectable } from '@angular/core';
import { ConfigService } from 'app/services/config.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ReporteService {
  url: string;

  constructor(
    private http: HttpClient,
    private config: ConfigService
  ) {
    this.url = this.config.api_url + "reportes/";
  }

  getUrlReporteCompra(id_cliente, id_lote) {
    return `${this.url}cliente_lote/${id_cliente}/${id_lote}`;
  }

}


