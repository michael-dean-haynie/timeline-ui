import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchEntitiesResult } from 'src/app/models/search-entities/search-enteties-result';

import { map, tap } from 'rxjs/operators';
import { GetEntitiesResult } from 'src/app/models/get-entities/get-entities-result';
import { GetEntitiesResponse } from 'src/app/models/get-entities/get-entities-response';
import { SearchEntitiesRespose } from 'src/app/models/search-entities/search-entities-response';

@Injectable({
  providedIn: 'root'
})
export class WikidataService {
  private wikidataEndpoint = 'http://localhost:3000';

  constructor(
    private http: HttpClient
  ) { }

  searchEntities(search: string): Observable<SearchEntitiesResult[]> {
    return this.http.post<SearchEntitiesRespose>(`${this.wikidataEndpoint}/entities`, { search })
      .pipe(map(resp => resp.search));
  }

  getEntities(ids: string[]): Observable<GetEntitiesResult[]> {
    return this.http.post<GetEntitiesResponse>(`${this.wikidataEndpoint}/links`, { ids })
    .pipe(map(response => Object.values(response.entities)));
  }
}
