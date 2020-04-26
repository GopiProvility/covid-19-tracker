import {Component, OnInit} from '@angular/core';
import {GlobalCoronaServiceService} from '../../service/global-corona-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

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
