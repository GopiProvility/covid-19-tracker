import {Component, OnInit} from '@angular/core';
import {GlobalCoronaServiceService} from '../../service/global-corona-service.service';
import { TotalCoronaCasesInfo } from '../model/totalcorona-casses';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  totalCoronaCasesInfo:TotalCoronaCasesInfo={
    totalConfirmed:30,
    totalRecovered: 40,
    totalDeaths:50,
    totalActive:60
  }
  constructor(private  globalCoronaServiceService: GlobalCoronaServiceService) {
  }

  ngOnInit(): void {
    this.globalCoronaServiceService.getGlobalCoronaData().subscribe({
      next: (result) => {
        console.log(result);
      }
    });
  }

}
