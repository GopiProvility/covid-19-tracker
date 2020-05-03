import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import { DateWiseCoronaConfirmedData } from '../components/model/datewisecorona-cases';
import { GlobalDataSummary } from '../components/model/global-data';

@Injectable({
  providedIn: 'root'
})
export class GlobalCoronaServiceService {
  private globalCoronaDataUrl = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/05-02-2020.csv';
  private dateWiseCoronaDataUrl = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv';

  constructor(private http: HttpClient) {
  }

  getGlobalCoronaData() {
    return this.http.get(this.globalCoronaDataUrl, {responseType: 'text'}).pipe(
      map(result => {
        const data: GlobalDataSummary[] = [];

        const rows = result.split('\n');

        const countryCoronaInfoMapper = {};

        rows.splice(0, 1); // to remove the column header value in csv

        this.buildTotalCoronaCasesInfo(rows, data);

        this.buildCountryWiseCoronaInfo(data, countryCoronaInfoMapper);

        return countryCoronaInfoMapper;

      }));
  }


  getDateWiseCoronaData(){
    return this.http.get(this.dateWiseCoronaDataUrl, {responseType: 'text'}).pipe(
      map(result => {
        const rows = result.split('\n');
        const mainData: { [x: string]: DateWiseCoronaConfirmedData[]; } = {};
        const header: string = rows[0];
        const dates = header.split(/,(?=\S)/);
        this.buildDateWiseCoronaData(mainData, dates, rows);

        return mainData;
      }));
  }

 private buildDateWiseCoronaData(mainData: { [x: string]: DateWiseCoronaConfirmedData[]; },
                                 dates: string[], rows: any[]){
    dates.splice(0, 4);
    rows.splice(0, 1);
    rows.forEach(row => {
      const cols = row.split(/,(?=\S)/);
      const con = cols[1];
      cols.splice(0, 4);
      mainData[con] = [];
      cols.forEach((value, index) => {
        const dw: DateWiseCoronaConfirmedData = {
          case: +value,
          country: con,
          actualDate: new Date(Date.parse(dates[index])),
          date: dates[index]
        };
        mainData[con].push(dw);
      });
    });
  }

  private buildTotalCoronaCasesInfo(rows, data: GlobalDataSummary[]) {
    rows.forEach(row => {
      const cols = row.split(/,(?=\S)/);
      data.push({
        country : cols[3],
        confirmed : +cols[7],
        deaths : +cols[8],
        recovered : +cols[9],
        active : +cols[10]
      });
    });
  }

  private buildCountryWiseCoronaInfo(data: GlobalDataSummary[],
                                     countryCoronaInfoMapper: { [x: string]: GlobalDataSummary; }) {

    data.forEach((row: GlobalDataSummary)  => {

        if (row.country === undefined) { return; }

        if (countryCoronaInfoMapper[row.country]) {
          const temp: GlobalDataSummary = countryCoronaInfoMapper[row.country];
          temp.confirmed += row.confirmed;
          temp.active += row.active;
          temp.recovered += row.recovered;
          temp.deaths += row.deaths;
        }
        else {
          countryCoronaInfoMapper[row.country] = row;
        }
    });
  }
}

