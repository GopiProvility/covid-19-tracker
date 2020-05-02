import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-googlechart',
  templateUrl: './googlechart.component.html',
  styleUrls: ['./googlechart.component.css']
})
export class GooglechartComponent implements OnInit {
  chart = {
    height: 500,
    options: {
      animation: {
        duration: 1000,
        easing: 'out',
      },
      is3D: true
    }
  };


  @Input('chartType')
  // tslint:disable-next-line: whitespace
  chartType:string ;
  // tslint:disable-next-line: no-input-rename
  @Input('chartDataTable')
  chartDataTable: any;

  constructor() { }

  ngOnInit(): void {
  }

}
