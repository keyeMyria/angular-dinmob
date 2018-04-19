import { Component, OnInit } from '@angular/core';
import { LogService } from '../../../services/log.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

  registro: any = [];
  constructor(
    private logSrv: LogService
  ) { }

  ngOnInit() {
    this.logSrv.getLog()
      .subscribe(registro => {
        this.registro = registro;
      }, (error) => {

      });
  }

}
