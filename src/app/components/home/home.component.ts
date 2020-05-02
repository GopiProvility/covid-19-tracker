import {Component, OnInit} from '@angular/core';
import {GlobalCoronaServiceService} from '../../service/global-corona-service.service';
import { TotalCoronaCasesInfo } from '../model/totalcorona-casses';
import { GlobalDataSummary } from '../model/global-data';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  totalCoronaCasesInfo: TotalCoronaCasesInfo = {
    totalConfirmed: 0,
    totalRecovered: 0,
    totalDeaths: 0,
    totalActive: 0
  };
  constructor(private  globalCoronaServiceService: GlobalCoronaServiceService) {
  }

  ngOnInit(): void {
    this.globalCoronaServiceService.getGlobalCoronaData().subscribe({
      next: (data: GlobalDataSummary[]) => {

        data.forEach(row => {
          this.totalCoronaCasesInfo.totalConfirmed += row.confirmed;
          this.totalCoronaCasesInfo.totalActive += row.active;
          this.totalCoronaCasesInfo.totalDeaths += row.deaths;
          this.totalCoronaCasesInfo.totalRecovered += row.recovered;
        });

      }
    });
  }

}
