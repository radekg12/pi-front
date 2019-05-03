import {Component, OnInit} from '@angular/core';
import {TitleService} from '../services/title.service';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {

  constructor(private titleService: TitleService) {
  }

  ngOnInit() {
    this.titleService.init();
  }

}
