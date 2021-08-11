import { SearchEntitiesResult } from "./search-enteties-result";

/**
 * Corresponding to the wikidata wbsearchentities api
 * Represents a response from a wikidata search request
 */
export interface SearchEntitiesRespose {
    search: SearchEntitiesResult[]; // an array of individual search results
}