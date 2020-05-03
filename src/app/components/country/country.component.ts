import { Component, OnInit } from '@angular/core';
import { TotalCoronaCasesInfo } from '../model/totalcorona-casses';
import { GlobalCoronaServiceService } from 'src/app/service/global-corona-service.service';
import { CountryWiseCoronaConfirmedData } from '../model/datewisecorona-cases';

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
  selectedCountry: string = 'India';

  totalCoronaCasesInfo: TotalCoronaCasesInfo = {
    totalConfirmed: 0,
    totalRecovered: 0,
    totalDeaths: 0,
    totalActive: 0
  };

   chartType:string = 'LineChart';
   chartDataTable = [];

   countryCoronaInfoMapper: { [x: string]: GlobalDataSummary; };
   countryWiseCoronaData: { [x: string]: CountryWiseCoronaConfirmedData[]; } = {};

  selectedCountryWiseCoronaDataList: CountryWiseCoronaConfirmedData[] = [];

  constructor(private globalCoronaServiceService: GlobalCoronaServiceService ) { }

  ngOnInit(): void {
    merge(
      this.globalCoronaServiceService.getDateWiseCoronaData().pipe(map(result => {
        this.countryWiseCoronaData = result;
        })),

        this.globalCoronaServiceService.getGlobalCoronaData().pipe(map(result => {
         this.countries = Object.keys(result);
         this.countryCoronaInfoMapper = result;
         }
        ))
    ).subscribe({
      complete: () => {
        this.updateValues();
      }
    }  );
  }

  updateValues(): void{
    this.selectedCountryWiseCoronaDataList = [];
    // build total country corona info
    this.buildTotalCountryCoronaInfo(this.countryCoronaInfoMapper[this.selectedCountry]);
    this.selectedCountryWiseCoronaDataList =  this.countryWiseCoronaData[this.selectedCountry];

      // update selected country corona data to table
    this.updateSelectedCountryWiseCoronaData(this.selectedCountryWiseCoronaDataList);
    // build country date wise corona info for line chart
    this.updateLineChartDataTable();
  }

  updateSelectedCountryWiseCoronaData(selectedCountryWiseCoronaDataList){
    this.globalCoronaServiceService.setCountryWiseCoronaData(selectedCountryWiseCoronaDataList)
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
