
import {switchMap} from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { ActaEntregaService } from 'app/services/acta-entrega.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';

@Component({
  selector: 'app-acta-entrega',
  templateUrl: './acta-entrega.component.html',
  styleUrls: ['./acta-entrega.component.scss']
})
export class ActaEntregaComponent implements OnInit {

  acta: any = {};
  areas: string[];
  equipamiento: string[];

  constructor(
    private actaSrv: ActaEntregaService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.actaSrv.getActa(params.get('id'))))
      .subscribe((res: any) => {
        this.acta = res.acta;
        this.areas = res.areas;
        this.equipamiento = res.equipamiento;
      });
  }

}
