import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import { TotalCoronaCasesInfo } from '../components/model/totalcorona-casses';
import { DateWiseCoronaConfirmedData } from '../components/model/datewisecorona-cases';

@Injectable({
  providedIn: 'root'
})
export class GlobalCoronaServiceService {
  private globalCoronaDataUrl = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/04-24-2020.csv';
  private dateWiseCoronaDataUrl="https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv"

  constructor(private http: HttpClient) {
  }

  getGlobalCoronaData() {
    return this.http.get(this.globalCoronaDataUrl, {responseType: 'text'}).pipe(
      map(result => {
        let rows = result.split('\n');
        rows.forEach(row => {
          let cols = row.split(/,(?=\S)/);
          console.log(cols);
        });
      }));
  }


  getDateWiseCoronaData(){
    return this.http.get(this.dateWiseCoronaDataUrl, {responseType: 'text'}).pipe(
      map(result => {
        let rows = result.split('\n');
        let mainData={}
       let header:string = rows[0];
       let dates = header.split(/,(?=\S)/)
       dates.splice(0,4);
       rows.splice(0,1);
        rows.forEach(row => {
          let cols = row.split(/,(?=\S)/);
          let con = cols[1]
          cols.splice(0,4);
          mainData[con] = [];
          cols.forEach((value,index)=>{
            let dw:DateWiseCoronaConfirmedData = {
              case:+value,
              country:con,
              date:new Date(Date.parse(dates[index]))
            }
            mainData[con].push(dw)
          })
        });

       return mainData;
      }));
  }
}

