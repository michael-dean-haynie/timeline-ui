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
  private wikidataEndpoint = 'http://localhost:3000/entities';

  constructor(
    private http: HttpClient
  ) { }

  searchEntities(searchString: string): Observable<SearchEntitiesResult[]> {
    return this.http.post<SearchEntitiesRespose>(this.wikidataEndpoint, { search: searchString })
      .pipe(map(resp => resp.search));
  }
}
