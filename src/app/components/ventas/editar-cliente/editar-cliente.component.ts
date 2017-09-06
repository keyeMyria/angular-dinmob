import { Component, OnInit } from '@angular/core';
import { Cliente } from "app/model/cliente";
import { MdDialog } from "@angular/material";
import { AgregarDocumentoDialogoComponent } from "app/components/ventas/agregar-documento-dialogo/agregar-documento-dialogo.component";


@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.scss']
})
export class EditarClienteComponent implements OnInit {

  cliente: Cliente;
  selectedOption: string;

  constructor(
    public dialog: MdDialog
  ) { }

  ngOnInit() {
    this.cliente = new Cliente();
    this.cliente.persona_moral = "0";
    
  }

  agregarDocumento() {
    
        console.log();
        let dialogRef = this.dialog.open(AgregarDocumentoDialogoComponent,{
          data:{           
          }
        });
        dialogRef.afterClosed().subscribe(result => {
          this.selectedOption = result;
        });
      }

}
