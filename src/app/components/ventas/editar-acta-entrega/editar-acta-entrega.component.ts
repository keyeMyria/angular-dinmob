import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ActaEntregaService } from 'app/services/acta-entrega.service';
import { ActaEntrega } from 'app/model/acta-entrega';

@Component({
  selector: 'app-editar-acta-entrega',
  templateUrl: './editar-acta-entrega.component.html',
  styleUrls: ['./editar-acta-entrega.component.scss']
})
export class EditarActaEntregaComponent implements OnInit {

  acta: any = {};
  areas: string[];
  equipamiento: string[];
  area: string;
  equipo: string;


  constructor(
    private actaSrv: ActaEntregaService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.paramMap
      .switchMap((params: ParamMap) =>
        this.actaSrv.getActa(params.get('id')))
      .subscribe(res => {
        this.acta = res.acta;
        this.areas = res.areas;
        this.equipamiento = res.equipamiento;
      });

  }

  addArea() {

  }

  addEquipo() {

  }

  delArea(area) {

  }

  delEquipo(equipo) {

  }

}
