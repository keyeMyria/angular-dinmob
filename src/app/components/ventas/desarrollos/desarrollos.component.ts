import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
  keyframes
} from "@angular/animations";
import { ObrasService } from "app/services/obras.service";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from 'app/services/auth.service';
import { Usuario } from 'app/model/usuario';

@Component({
  selector: 'app-desarrollos',
  templateUrl: './desarrollos.component.html',
  styleUrls: ['./desarrollos.component.scss'],

})
export class DesarrollosComponent implements OnInit {

  usuario: Usuario;

  obras: any = [];
  obra: any = {};
  obra_selected: number;

  constructor(
    private obraSrv: ObrasService,
    private router: Router,
    private route: ActivatedRoute,
    private auth: AuthService,
  ) { }



  ngOnInit() {
    this.usuario = this.auth.getUsuario();

    this.route.paramMap
      .switchMap((params: ParamMap) => {
        if (params.has("obra")) {
          this.obra_selected = +params.get("obra");
          return this.obraSrv.getLotes(params.get("obra"));
        } else {
          return Observable.of({});
        }
      }).subscribe(obra => {
        console.log("obra", obra);
        this.obra = obra
      });




      this.obraSrv.getObrasUsuario(this.usuario.id_usuario)
      .subscribe(response => {
        this.obras = response;
      });

  }

  ventasLote() {
    this.router.navigate(["/ventas/lote"]);
  }

  cargarObra(id_obra) {

    if (id_obra) {
      this.router.navigate([".", { obra: id_obra }]);
    } else {
      this.router.navigate([".", {}]);
    }

  }

}
