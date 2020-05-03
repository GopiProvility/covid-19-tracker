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

  constructor(private  globalCoronaServiceService: GlobalCoronaServiceService) {
  }

  ngOnInit(): void {
    this.globalCoronaServiceService.getGlobalCoronaData().subscribe({
      next: (data) => {

        this.globalData = Object.values(data) as GlobalDataSummary[];

        this.globalData.forEach(row => {
          this.totalCoronaCasesInfo.totalConfirmed += row.confirmed;
          this.totalCoronaCasesInfo.totalActive += row.active;
          this.totalCoronaCasesInfo.totalDeaths += row.deaths;
          this.totalCoronaCasesInfo.totalRecovered += row.recovered;
        });

        this.initCharts('c');

      }
    });
  }

  updateChart(caseType: string){
    this.initCharts(caseType);
  }

  private initCharts(caseType: string) {
    const dataTable = [];

    dataTable.push(['Country', 'Cases']);

    this.globalData.forEach(cs => {
      const value = this.getCaseTypeValue(caseType, cs);
      dataTable.push([
        cs.country , value
      ]);
    });

    this.buildPieChart(dataTable);

    this.buildColumnChart(dataTable);
  }

  private buildPieChart(dataTable) {
    this.pieChart = {
      chartType: 'PieChart',
      // tslint:disable-next-line: object-literal-shorthand
      dataTable: dataTable,
      options: {
        height : 600
      },
    };
  }

  private buildColumnChart(dataTable) {
    this.columnChart = {
      chartType: 'ColumnChart',
      // tslint:disable-next-line: object-literal-shorthand
      dataTable: dataTable,
      options: {
        height : 600
      },
    };
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
        if (row.recovered > 100) {
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
