import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EditarEntradaDialogoComponent } from 'app/components/almacen/editar-entrada-dialogo/editar-entrada-dialogo.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-entradas',
  templateUrl: './entradas.component.html',
  styleUrls: ['./entradas.component.scss']
})
export class EntradasComponent implements OnInit {
  obras: any = [];
  loading: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    //this.loading = true;
    this.route.data
      .subscribe((data: { obras: any[] }) => {
        //console.log("resultado resolve ", data);
        this.obras = data.obras;
      });
  }

  nuevaEntrada() {
    this.router.navigate(["/nueva-entrada"]);
  }

  editarEntrada() {
    this.router.navigate(["/editar-entrada"]);
  }



}
