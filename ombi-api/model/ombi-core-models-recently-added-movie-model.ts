// tslint:disable
/// <reference path="../custom.d.ts" />
/**
 * Ombi Api
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: v1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */



/**
 * 
 * @export
 * @interface OmbiCoreModelsRecentlyAddedMovieModel
 */
export interface OmbiCoreModelsRecentlyAddedMovieModel {
    /**
     * 
     * @type {number}
     * @memberof OmbiCoreModelsRecentlyAddedMovieModel
     */
    id?: number;
    /**
     * 
     * @type {string}
     * @memberof OmbiCoreModelsRecentlyAddedMovieModel
     */
    title?: string;
    /**
     * 
     * @type {string}
     * @memberof OmbiCoreModelsRecentlyAddedMovieModel
     */
    overview?: string;
    /**
     * 
     * @type {string}
     * @memberof OmbiCoreModelsRecentlyAddedMovieModel
     */
    imdbId?: string;
    /**
     * 
     * @type {string}
     * @memberof OmbiCoreModelsRecentlyAddedMovieModel
     */
    tvDbId?: string;
    /**
     * 
     * @type {string}
     * @memberof OmbiCoreModelsRecentlyAddedMovieModel
     */
    theMovieDbId?: string;
    /**
     * 
     * @type {string}
     * @memberof OmbiCoreModelsRecentlyAddedMovieModel
     */
    releaseYear?: string;
    /**
     * 
     * @type {Date}
     * @memberof OmbiCoreModelsRecentlyAddedMovieModel
     */
    addedAt?: Date;
    /**
     * 
     * @type {string}
     * @memberof OmbiCoreModelsRecentlyAddedMovieModel
     */
    quality?: string;
}


