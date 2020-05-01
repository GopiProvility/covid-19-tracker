import { Component, OnInit } from '@angular/core';
import { TotalCoronaCasesInfo } from '../model/totalcorona-casses';
import { GlobalCoronaServiceService } from 'src/app/service/global-corona-service.service';
import { DateWiseCoronaConfirmedData } from '../model/datewisecorona-cases';
import { GoogleChartInterface } from 'ng2-google-charts';
import { merge } from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {

  countries: string[] = ['India', 'Srilanka', 'Pak', 'Sa', 'Singapore'];
  totalCoronaCasesInfo: TotalCoronaCasesInfo = {
    totalConfirmed: 3,
    totalRecovered: 4,
    totalDeaths: 5,
    totalActive: 6
  };

  lineChart: GoogleChartInterface = {
    chartType: 'LineChart'
  };
  coronaCountryWistData: any = {
    India: {
      totalConfirmed: 10,
      totalRecovered: 10,
      totalDeaths: 10,
      totalActive: 10
    },
    Srilanka: {
      totalConfirmed: 20,
      totalRecovered: 20,
      totalDeaths: 20,
      totalActive: 20
    },
    Pak: {
      totalConfirmed: 30,
      totalRecovered: 30,
      totalDeaths: 30,
      totalActive: 30
    },
    Sa: {
      totalConfirmed: 40,
      totalRecovered: 40,
      totalDeaths: 40,
      totalActive: 40
    },
    Singapore: {
      totalConfirmed: 50,
      totalRecovered: 50,
      totalDeaths: 50,
      totalActive: 50
    }
  };
  dateWiseCoronaData;

  selectedCountryWiseCoronaDataList: DateWiseCoronaConfirmedData[] = [];

  constructor(private globalCoronaServiceService: GlobalCoronaServiceService ) { }

  ngOnInit(): void {
    // this.globalCoronaServiceService.getGlobalCoronaData().subscribe({
    //   next: (result) => {
    //     console.log(result);
    //   }
    // });
    this.globalCoronaServiceService.getDateWiseCoronaData().subscribe(
    (result) => {
      this.dateWiseCoronaData = result;
      }
    );

    merge(
      this.globalCoronaServiceService.getDateWiseCoronaData().pipe(map(result => {
        this.dateWiseCoronaData = result;
        })),

        this.globalCoronaServiceService.getGlobalCoronaData().pipe(map(result => {
          console.log(result); }
        ))
    ).subscribe({
      complete: () => {
        this.updateValues('Singapore');
      }
    }  );
  }

  updateValues(selectedCountry: string): void{
   this.totalCoronaCasesInfo =  this.coronaCountryWistData[selectedCountry];
   this.selectedCountryWiseCoronaDataList =  this.dateWiseCoronaData[selectedCountry];
   this.selectedCountryWiseCoronaDataList =  this.selectedCountryWiseCoronaDataList.reverse();
   const dataTable = [];
   dataTable.push(['Date', 'Cases']);
   this.selectedCountryWiseCoronaDataList.forEach(countryWiseData => {
     dataTable.push([countryWiseData.date, countryWiseData.case]);
   });
   this.updateLineChart(dataTable);
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
