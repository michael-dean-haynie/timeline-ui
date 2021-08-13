import { Component } from '@angular/core';
import { WikidataService } from './services/api-services/wikidata.service';
import { FormBuilder, FormControl } from '@angular/forms';
import { debounceTime, filter, switchMap, tap } from 'rxjs/operators';
import { SearchEntitiesResult } from './models/search-entities/search-enteties-result';
import { GetEntitiesResult } from './models/get-entities/get-entities-result';
import { SearchResultTM } from './models/template/search-result-template-model';
import { SITELINKS } from './models/constants/sitelinks';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'timeline-ui';
  searchEntitiesResults: SearchEntitiesResult[] = [];
  getEntitiesResults: GetEntitiesResult[] = [];
  searchResults: SearchResultTM[] = [];
  myControl: FormControl;

  constructor(
    private wikidataService: WikidataService,
    private fb: FormBuilder
  ) {
    this.myControl = this.fb.control('');
    this.myControl.valueChanges.pipe(
      tap(value => console.log(`Immediate Tap: "${value}"`)),
      debounceTime(500),
      tap(value => console.log(`Debounced Tap: "${value}"`)),
      filter(value => !!value.length), // do not continue if search is empty string
      switchMap(value => this.wikidataService.searchEntities(value)),
      tap(value => console.log(`Search Results:`, value)),
      tap(value => this.searchEntitiesResults = value),
      filter(searchResults => !!searchResults.length), // do not continue if there are no results
      switchMap(searchResults => this.wikidataService.getEntities(searchResults.map(sr => sr.id))),
      tap(getResults => console.log(`Get Results:`, getResults)),
      tap(getResults => this.getEntitiesResults = getResults),
      tap(() => this.buildSearchResultTMs())
    ).subscribe();
  }

  private buildSearchResultTMs(): void {
    this.searchResults = [];
    this.searchEntitiesResults.forEach(ser => {
      let sitelinkUrl = undefined;
      const ger = this.getEntitiesResults.find(_ger => _ger.id === ser.id);
      if (undefined !== ger){
        const enSitelink = ger.sitelinks[SITELINKS.EN];
        if (enSitelink) {
          sitelinkUrl = enSitelink.url;
        }
      }

      this.searchResults.push({
        label: ser.label,
        description: ser.description,
        sitelinkUrl
      });
    });
  }




}
