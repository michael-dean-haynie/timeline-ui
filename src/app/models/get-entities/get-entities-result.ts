import { Sitelink } from "./sitelink";

/**
 * Corresponding to the wikidata wbgetentities api
 * Represents a singular get result
 */
 export interface GetEntitiesResult{
    type: string;
    id: string;
    sitelinks: {
        [index: string]: Sitelink;
    }
}