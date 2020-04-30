import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GlobalCoronaServiceService {
  private globalCoronaDataUrl = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/04-24-2020.csv';

  constructor(private http: HttpClient) {
  }

  getGlobalCoronaData() {
    return this.http.get(this.globalCoronaDataUrl, {responseType: 'text'}).pipe(
      map(result => {
        let rows = result.split('\n');
        rows.forEach(row => {
          let cols = row.split('/,(?=\S)/');
          console.log(cols);
        });
      }));
  }
}

