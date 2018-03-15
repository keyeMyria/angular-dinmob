import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';
import { FormatoDialogoComponent } from '../formato-dialogo/formato-dialogo.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-importar-prototipo',
  templateUrl: './importar-prototipo.component.html',
  styleUrls: ['./importar-prototipo.component.scss']
})
export class ImportarPrototipoComponent implements OnInit {
  obras: any[] = [];
  obra_selected: string = "";
  form: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private dialog: MatDialog,
  ) {
    this.form = this.fb.group({


      nombre_prototipo: [null, Validators.required],
      obra: [null, Validators.required],
    });
  }

  ngOnInit() {
    this.route.data
      .subscribe((data: { obras: any[], especialidades: any }) => {
        this.obras = data.obras;
      });
  }

  cargarObra(id_obra) {

    if (id_obra) {
      this.router.navigate([".", { obra: id_obra }]);
    } else {
      this.router.navigate([".", {}]);
    }

  }

  guardar() {
    console.log("ok", this.form.value)
  }

  gotoFormato() {

    let dialogRef = this.dialog.open(FormatoDialogoComponent, {
      data: {
      },
      width: "500px"
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

}
