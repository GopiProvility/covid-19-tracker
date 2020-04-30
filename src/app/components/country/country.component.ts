import { Component, OnInit } from '@angular/core';
import { TotalCoronaCasesInfo } from '../model/totalcorona-casses';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {

  countries:string[] = ["India","Srilanks","Pak","Sa","Sigapore"]
  totalCoronaCasesInfo:TotalCoronaCasesInfo={
    totalConfirmed:3,
    totalRecovered: 4,
    totalDeaths:5,
    totalActive:6
  }
  constructor() { }

  ngOnInit(): void {
  }

}
