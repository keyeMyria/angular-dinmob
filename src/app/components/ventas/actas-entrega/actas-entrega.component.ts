import { Component, OnInit } from '@angular/core';
import { ActaEntregaService } from 'app/services/acta-entrega.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-actas-entrega',
  templateUrl: './actas-entrega.component.html',
  styleUrls: ['./actas-entrega.component.scss']
})
export class ActasEntregaComponent implements OnInit {

  actas: any;

  constructor(private actaSrv: ActaEntregaService, private router: Router,) { }

  ngOnInit() {
    this.actaSrv.getActas()
      .subscribe(res => {
        this.actas = res;
      });
  }

  editarActa(acta){
    console.log("acta",acta);
    this.router.navigate(["/editar-acta-entrega",acta.id_acta_entrega]);
  }

  verActa(acta){
    console.log("acta",acta);
    this.router.navigate(["/acta-entrega",acta.id_acta_entrega]);
  }



}
