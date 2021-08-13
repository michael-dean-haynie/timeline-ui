import { GetEntitiesResult } from "./get-entities-result";

/**
 * Corresponding to the wikidata wbgetentities api
 * Represents a response from a wikidata get entities request
 * 
 * https://www.typescriptlang.org/docs/handbook/2/objects.html#index-signatures
 */
 export interface GetEntitiesResponse {
    [index: string]: GetEntitiesResult
}