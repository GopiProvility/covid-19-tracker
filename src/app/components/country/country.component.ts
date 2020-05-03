import { Component, OnInit } from '@angular/core';
import { TotalCoronaCasesInfo } from '../model/totalcorona-casses';
import { GlobalCoronaServiceService } from 'src/app/service/global-corona-service.service';
import { DateWiseCoronaConfirmedData } from '../model/datewisecorona-cases';

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

//  chart = {
//   chartType : 'LineChart' ,
//   height: 500,
//   options: {
//     animation: {
//       duration: 1000,
//       easing: 'out',
//     },
//     is3D: true
//   }
//  };
  chartType = 'LineChart';
  chartDataTable = [];
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
        this.updateValues('India');
      }
    }  );
  }

  updateValues(selectedCountry: string): void{
    // build total country corona info
    this.buildTotalCountryCoronaInfo(this.countryCoronaInfoMapper[selectedCountry]);
    this.selectedCountryWiseCoronaDataList =  this.dateWiseCoronaData[selectedCountry];
    this.selectedCountryWiseCoronaDataList =  this.selectedCountryWiseCoronaDataList.reverse();
    // build country date wise corona info for line chart
    this.updateLineChartDataTable();
  }

  private buildTotalCountryCoronaInfo(globalDataSummary: GlobalDataSummary){
    this.totalCoronaCasesInfo.totalActive = globalDataSummary.active;
    this.totalCoronaCasesInfo.totalConfirmed = globalDataSummary.confirmed;
    this.totalCoronaCasesInfo.totalDeaths = globalDataSummary.deaths;
    this.totalCoronaCasesInfo.totalRecovered = globalDataSummary.recovered;
  }



  updateLineChartDataTable(){
    this.chartDataTable = [];
    this.selectedCountryWiseCoronaDataList.forEach(countryWiseData => {
      this.chartDataTable.push([countryWiseData.actualDate, countryWiseData.case]);
   });
  }
}
