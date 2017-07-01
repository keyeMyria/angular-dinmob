import { Component, OnInit } from '@angular/core';
import { ObrasService } from "app/services/obras.service";

@Component({
  selector: 'app-obras',
  templateUrl: './obras.component.html',
  styleUrls: ['./obras.component.scss']
})
export class ObrasComponent implements OnInit {
  obras: any[];

  constructor(private obrasService: ObrasService) { }

  ngOnInit() {
    this.obrasService.getAllObras()
      .subscribe(response => this.obras = response);
  }

}
