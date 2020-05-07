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

  globalData: GlobalDataSummary[];

  pieChart = {
    chartType: 'PieChart',
  };

  columnChart = {
    chartType: 'ColumnChart',
  };

  dataTable: any = [];

  errorMessage: string;

  constructor(private  globalCoronaServiceService: GlobalCoronaServiceService) {
  }

  ngOnInit(): void {
    this.globalCoronaServiceService.getGlobalCoronaData().subscribe(
       (data) => {

        this.globalData = Object.values(data) as GlobalDataSummary[];

        this.globalData.forEach(row => {
          this.totalCoronaCasesInfo.totalConfirmed += row.confirmed;
          this.totalCoronaCasesInfo.totalActive += row.active;
          this.totalCoronaCasesInfo.totalDeaths += row.deaths;
          this.totalCoronaCasesInfo.totalRecovered += row.recovered;
        });

        this.initCharts('c');
      },
      (error) => {
        this.errorMessage = error;
      }
    );
  }

  updateChart(caseType: string){
    this.initCharts(caseType);
  }

  private initCharts(caseType: string) {
    this.dataTable = [];
    this.globalData.forEach(cs => {
      const value = this.getCaseTypeValue(caseType, cs);
      this.dataTable.push([
        cs.country , value
      ]);
    });
  }

  private getCaseTypeValue(caseType: string, row: GlobalDataSummary) {
    let value = 0;
    switch (caseType) {
      case 'a':
        if (row.active > 200) {
          value = row.active;
        }
        break;
      case 'd':
        if (row.deaths > 500) {
          value = row.deaths;
        }
        break;
      case 'r':
        if (row.recovered > 500) {
          value = row.recovered;
        }
        break;
      case 'c':
        if (row.confirmed > 2000) {
          value = row.confirmed;
        }
        break;
    }
    return value;
  }



}
