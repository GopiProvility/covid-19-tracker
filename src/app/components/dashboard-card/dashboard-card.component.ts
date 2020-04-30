import { Component, OnInit, Input } from '@angular/core';
import { TotalCoronaCasesInfo } from '../model/totalcorona-casses';

@Component({
  selector: 'app-dashboard-card',
  templateUrl: './dashboard-card.component.html',
  styleUrls: ['./dashboard-card.component.css']
})
export class DashboardCardComponent implements OnInit {

  @Input('totalCoronaCasesInfo')
  totalCoronaCasesInfo:TotalCoronaCasesInfo;

  constructor() { }

  ngOnInit(): void {
  }

}
