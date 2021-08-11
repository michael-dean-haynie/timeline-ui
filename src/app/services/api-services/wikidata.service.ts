import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchEntitiesResult } from 'src/app/models/search-enteties-result';
import { SearchEntitiesRespose } from 'src/app/models/search-entities-response';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WikidataService {
  private wikidataEndpoint = 'https://www.wikidata.org/w/api.php';

  constructor(
    private http: HttpClient
  ) { }

  searchEntities(searchString: string): Observable<SearchEntitiesResult[]> {
    const params = new HttpParams()
      .set('action', 'wbsearchentities')
      .set('format', 'json')
      .set('language', 'en')
      .set('type', 'item')
      .set('limit', 10)
      .set('search', searchString);
    return this.http.get<SearchEntitiesRespose>(this.wikidataEndpoint, { params })
      .pipe(map(resp => resp.search));
  }
}
