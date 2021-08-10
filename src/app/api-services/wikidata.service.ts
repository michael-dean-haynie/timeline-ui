import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WikidataService {
  private wikidataEndpoint = 'https://www.wikidata.org/w/api.php';

  constructor(
    private http: HttpClient
  ) { }

  searchEntities(searchString: string): Observable<any> {
    const params = new HttpParams()
      .set('action', 'wbsearchentities')
      .set('format', 'json')
      .set('language', 'en')
      .set('type', 'item')
      .set('search', searchString);
    return this.http.get<any>(this.wikidataEndpoint, { params });
  }
}
