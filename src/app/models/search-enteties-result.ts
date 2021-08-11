/**
 * Corresponding to the wikidata wbsearchentities api
 * Represents a singular search result
 */
export interface SearchEntitiesResult{
    id: string; // The wikidata 'Q' ID
    label: string;
    description: string;
}