import {Component, OnInit} from '@angular/core';
import {GlobalCoronaServiceService} from '../../service/global-corona-service.service';
import { TotalCoronaCasesInfo } from '../model/totalcorona-casses';
import { GlobalDataSummary } from '../model/global-data';
import { GoogleChartInterface } from 'ng2-google-charts';

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

  pieChart: GoogleChartInterface = {
    chartType: 'PieChart',
  };

  columnChart: GoogleChartInterface = {
    chartType: 'ColumnChart',
  };

  constructor(private  globalCoronaServiceService: GlobalCoronaServiceService) {
  }

  ngOnInit(): void {
    this.globalCoronaServiceService.getGlobalCoronaData().subscribe({
      next: (data: GlobalDataSummary[]) => {

        this.globalData = data;

        data.forEach(row => {
          this.totalCoronaCasesInfo.totalConfirmed += row.confirmed;
          this.totalCoronaCasesInfo.totalActive += row.active;
          this.totalCoronaCasesInfo.totalDeaths += row.deaths;
          this.totalCoronaCasesInfo.totalRecovered += row.recovered;
        });

        this.initCharts();

      }
    });
  }

  private initCharts() {
    const dataTable = [];

    dataTable.push(['Country', 'Cases']);

    this.globalData.forEach(cs => {
      dataTable.push([
        cs.country , cs.confirmed
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

}
