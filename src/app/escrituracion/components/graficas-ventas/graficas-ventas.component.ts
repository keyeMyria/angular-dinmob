import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-graficas-ventas',
  templateUrl: './graficas-ventas.component.html',
  styleUrls: ['./graficas-ventas.component.scss']
})
export class GraficasVentasComponent implements OnInit {

  data = [
    {
      "name": "Enero",
      "value": 5
    },
    {
      "name": "Febrero",
      "value": 7
    },
    {
      "name": "Marzo",
      "value": 4
    },
    {
      "name": "Abril",
      "value": 4
    },
    {
      "name": "Mayo",
      "value": 4
    },
    {
      "name": "Junio",
      "value": 5
    },
    {
      "name": "Julio",
      "value": 4
    },
    {
      "name": "Agosto",
      "value": 6
    },
    {
      "name": "Septiembre",
      "value": 3
    },
    {
      "name": "Octubre",
      "value": 1
    },
    {
      "name": "Noviembre",
      "value": 5
    },
    {
      "name": "Diciembre",
      "value": 4
    }
  ];

  data2 = [
    {
      "name": "Vendedor",
      "series": [
        {
          "name": "Enero",
          "value": 5
        },
        {
          "name": "Febrero",
          "value": 7
        },
        {
          "name": "Marzo",
          "value": 4
        },
        {
          "name": "Abril",
          "value": 4
        },
        {
          "name": "Mayo",
          "value": 4
        },
        {
          "name": "Junio",
          "value": 5
        },
        {
          "name": "Julio",
          "value": 4
        },
        {
          "name": "Agosto",
          "value": 6
        },
        {
          "name": "Septiembre",
          "value": 3
        },
        {
          "name": "Octubre",
          "value": 1
        },
        {
          "name": "Noviembre",
          "value": 5
        },
        {
          "name": "Diciembre",
          "value": 4
        }
      ]
    },
    {
      "name": "Equipo",
      "series": [
        {
          "name": "Enero",
          "value": 7
        },
        {
          "name": "Febrero",
          "value": 9
        },
        {
          "name": "Marzo",
          "value": 6
        },
        {
          "name": "Abril",
          "value": 6
        },
        {
          "name": "Mayo",
          "value": 7
        },
        {
          "name": "Junio",
          "value": 7
        },
        {
          "name": "Julio",
          "value": 6
        },
        {
          "name": "Agosto",
          "value": 8
        },
        {
          "name": "Septiembre",
          "value": 5
        },
        {
          "name": "Octubre",
          "value": 3
        },
        {
          "name": "Noviembre",
          "value": 7
        },
        {
          "name": "Diciembre",
          "value": 6
        }
      ]
    }
  ];



  view; //: any[] = [700, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showDataLabel = true;
  showXAxisLabel = true;
  xAxisLabel = '2018';
  showYAxisLabel = true;
  yAxisLabel = 'Ventas';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor() { }

  ngOnInit() {
  }

  onSelect(event) {
    console.log(event);
  }

}
