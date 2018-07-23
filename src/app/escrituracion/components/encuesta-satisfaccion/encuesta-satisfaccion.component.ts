import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-encuesta-satisfaccion',
  templateUrl: './encuesta-satisfaccion.component.html',
  styleUrls: ['./encuesta-satisfaccion.component.scss']
})
export class EncuestaSatisfaccionComponent implements OnInit {

  encuestas = [
    {
      pregunta: "¿Te gustó el servicio que se te brindó?"
    },
    {
      pregunta: "¿El vendedor que lo atendió le dio un buen servicio?"
    },
    {
      pregunta: "¿Cómo calificaría el recorrido del inmueble?"
    },
    {
      pregunta: "¿Cómo calificaría el proceso de entrega del inmueble?"
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}
