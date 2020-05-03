import { Component, OnInit, Input } from '@angular/core';
import { PagerService } from 'src/app/service/pager.service';
import { DateWiseCoronaConfirmedData } from '../model/datewisecorona-cases';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {


  constructor(private pagerService: PagerService) { }

   // array of all items to be paged
   // tslint:disable-next-line:no-input-rename
   @Input('selectedCountryWiseCoronaDataList')
   selectedCountryWiseCoronaDataList: DateWiseCoronaConfirmedData[];



    // pager object
    pager: any = {};

    // paged items
    pagedItems: any[];

    ngOnInit() {
      this.setPage(1);
    }

    setPage(page: number) {
        // get pager object from service
        this.pager = this.pagerService.getPager(this.selectedCountryWiseCoronaDataList.length, page);

        // get current page of items
        this.pagedItems = this.selectedCountryWiseCoronaDataList.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }
}
