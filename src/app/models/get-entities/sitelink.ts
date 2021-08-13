/**
 * Corresponding to the wikidata wbgetentities api
 * Represents a link to another site (wikipedia) associated with a wikidata item
 * Included in GetEntitiesResult model
 */
export interface Sitelink {
    site: string;
    title: string;
    badges: any[]; // unknown element shape for now
    url: string;
}