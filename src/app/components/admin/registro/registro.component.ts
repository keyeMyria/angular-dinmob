import { Component, OnInit } from '@angular/core';
import { LogService } from '../../../services/log.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

  registro: any = [];
  usuarios: any = [];
  id_usuario_selected: string = "";


  constructor(
    private logSrv: LogService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.data
      .subscribe((data: { usuarios: any[] }) => {
        this.usuarios = data.usuarios;
      });


    this.logSrv.getLog()
      .subscribe(registro => {
        this.registro = registro;
      }, (error) => {

      });
  }

  registroUsuario(id_usuario) {
    console.log("registro usuario", id_usuario);

  }

}
