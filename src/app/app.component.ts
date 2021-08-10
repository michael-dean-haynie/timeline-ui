import { Component } from '@angular/core';
import { WikidataService } from './api-services/wikidata.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'timeline-ui';
  options = [];

  constructor(
    private wikidataService: WikidataService
  ) {
    wikidataService.searchEntities('Britney Spears').subscribe(results => console.log(results));
  }


}
