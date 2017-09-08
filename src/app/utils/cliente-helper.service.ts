import { Injectable } from '@angular/core';
import { Cliente } from 'app/model/cliente';

@Injectable()
export class ClienteHelperService {

  constructor() { }

  getNombre(cliente: Cliente): string {
    //console.log("get nombre");
    if (cliente.persona_moral === '0') {
      return cliente.nombre_persona_fisica;
    } else {
      return cliente.razon_social_persona_moral;
    }

  }

  getRfc(cliente: Cliente): string {
    //console.log("get rfc");
    if (cliente.persona_moral === '0') {
      return cliente.rfc_persona_fisica;
    } else {
      return cliente.rfc_persona_moral;
    }

  }


}
