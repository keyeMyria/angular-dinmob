import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-estructura-obra',
  templateUrl: './estructura-obra.component.html',
  styleUrls: ['./estructura-obra.component.scss']
})
export class EstructuraObraComponent implements OnInit {

  obras:any = [
    {
      id_obra:1,
      nombre:"obra 1",
      datos:{nombre:"obra 1"},
      manzanas:[
        {id_manzana:1,nombre:"Manzana 1", lotes:[
          {id_lote:1,nombre:"Lote 1"},
          {id_lote:2,nombre:"Lote 2"},
          {id_lote:3,nombre:"Lote 3"},
          {id_lote:4,nombre:"Lote 4"}
        ]}
    
      ]
    }, 
    {id_obra:2,nombre:"obra 2"}
  ];

  obra=this.obras[0];

  constructor() { }

  ngOnInit() {
  }

}
