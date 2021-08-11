import { Component } from '@angular/core';
import { WikidataService } from './services/api-services/wikidata.service';
import { FormBuilder, FormControl } from '@angular/forms';
import { debounceTime, switchMap, tap } from 'rxjs/operators';
import { SearchEntitiesResult } from './models/search-enteties-result';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'timeline-ui';
  searchResults: SearchEntitiesResult[] = [];
  myControl: FormControl;

  constructor(
    private wikidataService: WikidataService,
    private fb: FormBuilder
  ) {
    this.wikidataService.searchEntities('Britney Spears').subscribe(results => console.log(results));

    this.myControl = this.fb.control('');
    this.myControl.valueChanges.pipe(
      tap(value => console.log(`Immediate Tap: "${value}"`)),
      debounceTime(500),
      tap(value => console.log(`Debounced Tap: "${value}"`)),
      switchMap(value => this.wikidataService.searchEntities(value)),
      tap(value => console.log(`Search Results:`, value)),
      tap(value => this.searchResults = value)
    ).subscribe();
  }


}
