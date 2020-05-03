import { Component, OnInit, Input } from '@angular/core';
import { PagerService } from 'src/app/service/pager.service';
import { CountryWiseCoronaConfirmedData } from '../model/datewisecorona-cases';
import { GlobalCoronaServiceService } from 'src/app/service/global-corona-service.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {


  constructor(private pagerService: PagerService ,
              private globalCoronaServiceService: GlobalCoronaServiceService ) { }

   // array of all items to be paged
   // tslint:disable-next-line:no-input-rename
   selectedCountryWiseCoronaDataList: CountryWiseCoronaConfirmedData[];



    // pager object
    pager: any = {};

    // paged items
    pagedItems: any[];

    ngOnInit() {
      this.globalCoronaServiceService.countyWiseCoronaConfirmedDataList$.subscribe((countryWiseCoronaConfirmedDataList) => {
       this.selectedCountryWiseCoronaDataList = countryWiseCoronaConfirmedDataList;
       this.setPage(1);
      });

    }

    setPage(page: number) {
        // get pager object from service
        this.pager = this.pagerService.getPager(this.selectedCountryWiseCoronaDataList.length, page);

        // get current page of items
        this.pagedItems = this.selectedCountryWiseCoronaDataList.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }
}
