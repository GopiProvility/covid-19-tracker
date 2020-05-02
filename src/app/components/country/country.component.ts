import { Component, OnInit } from '@angular/core';
import { TotalCoronaCasesInfo } from '../model/totalcorona-casses';
import { GlobalCoronaServiceService } from 'src/app/service/global-corona-service.service';
import { DateWiseCoronaConfirmedData } from '../model/datewisecorona-cases';
import { GoogleChartInterface } from 'ng2-google-charts';
import { merge } from 'rxjs';
import {map} from 'rxjs/operators';
import { GlobalDataSummary } from '../model/global-data';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {

  countries: string[] ;
  totalCoronaCasesInfo: TotalCoronaCasesInfo = {
    totalConfirmed: 3,
    totalRecovered: 4,
    totalDeaths: 5,
    totalActive: 6
  };

  lineChart: GoogleChartInterface = {
    chartType: 'LineChart'
  };
  countryCoronaInfoMapper: { [x: string]: GlobalDataSummary; };
   dateWiseCoronaData: { [x: string]: DateWiseCoronaConfirmedData[]; } = {};

  selectedCountryWiseCoronaDataList = [];

  constructor(private globalCoronaServiceService: GlobalCoronaServiceService ) { }

  ngOnInit(): void {
    merge(
      this.globalCoronaServiceService.getDateWiseCoronaData().pipe(map(result => {
        this.dateWiseCoronaData = result;
        })),

        this.globalCoronaServiceService.getGlobalCoronaData().pipe(map(result => {
         this.countries = Object.keys(result);
         this.countryCoronaInfoMapper = result;
         }
        ))
    ).subscribe({
      complete: () => {
        this.updateValues('Singapore');
      }
    }  );
  }

  updateValues(selectedCountry: string): void{
    this.selectedCountryWiseCoronaDataList = [];
    // build total country corona info
    this.buildTotalCountryCoronaInfo(this.countryCoronaInfoMapper[selectedCountry]);
    this.selectedCountryWiseCoronaDataList =  this.dateWiseCoronaData[selectedCountry];
    this.selectedCountryWiseCoronaDataList =  this.selectedCountryWiseCoronaDataList.reverse();
    // build country date wise corona info for line chart
    const dataTable = [];
    dataTable.push(['Date', 'Cases']);
    this.selectedCountryWiseCoronaDataList.forEach(countryWiseData => {
     dataTable.push([countryWiseData.date, countryWiseData.case]);
   });
    this.clearLineChart();

    this.updateLineChart(dataTable);
  }

  private clearLineChart() {
    this.updateLineChart([]);
  }
  private buildTotalCountryCoronaInfo(globalDataSummary: GlobalDataSummary){
    this.totalCoronaCasesInfo.totalActive = globalDataSummary.active;
    this.totalCoronaCasesInfo.totalConfirmed = globalDataSummary.confirmed;
    this.totalCoronaCasesInfo.totalDeaths = globalDataSummary.deaths;
    this.totalCoronaCasesInfo.totalRecovered = globalDataSummary.recovered;
  }



  updateLineChart(dataTable){

    this.lineChart = {
    chartType: 'LineChart',
     dataTable,
    options: {height: 500,
    animation: {
    duration: 1000,
   easing: 'out'
}}
    };
  }
}
