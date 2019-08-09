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
 * @interface OmbiCoreModelsSearchSearchAlbumViewModel
 */
export interface OmbiCoreModelsSearchSearchAlbumViewModel {
    /**
     * 
     * @type {string}
     * @memberof OmbiCoreModelsSearchSearchAlbumViewModel
     */
    title?: string;
    /**
     * 
     * @type {string}
     * @memberof OmbiCoreModelsSearchSearchAlbumViewModel
     */
    foreignAlbumId?: string;
    /**
     * 
     * @type {boolean}
     * @memberof OmbiCoreModelsSearchSearchAlbumViewModel
     */
    monitored?: boolean;
    /**
     * 
     * @type {string}
     * @memberof OmbiCoreModelsSearchSearchAlbumViewModel
     */
    albumType?: string;
    /**
     * 
     * @type {number}
     * @memberof OmbiCoreModelsSearchSearchAlbumViewModel
     */
    rating?: number;
    /**
     * 
     * @type {Date}
     * @memberof OmbiCoreModelsSearchSearchAlbumViewModel
     */
    releaseDate?: Date;
    /**
     * 
     * @type {string}
     * @memberof OmbiCoreModelsSearchSearchAlbumViewModel
     */
    artistName?: string;
    /**
     * 
     * @type {string}
     * @memberof OmbiCoreModelsSearchSearchAlbumViewModel
     */
    foreignArtistId?: string;
    /**
     * 
     * @type {string}
     * @memberof OmbiCoreModelsSearchSearchAlbumViewModel
     */
    cover?: string;
    /**
     * 
     * @type {string}
     * @memberof OmbiCoreModelsSearchSearchAlbumViewModel
     */
    disk?: string;
    /**
     * 
     * @type {number}
     * @memberof OmbiCoreModelsSearchSearchAlbumViewModel
     */
    percentOfTracks?: number;
    /**
     * 
     * @type {string}
     * @memberof OmbiCoreModelsSearchSearchAlbumViewModel
     */
    type?: OmbiCoreModelsSearchSearchAlbumViewModelTypeEnum;
    /**
     * 
     * @type {boolean}
     * @memberof OmbiCoreModelsSearchSearchAlbumViewModel
     */
    partiallyAvailable?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof OmbiCoreModelsSearchSearchAlbumViewModel
     */
    fullyAvailable?: boolean;
    /**
     * 
     * @type {number}
     * @memberof OmbiCoreModelsSearchSearchAlbumViewModel
     */
    id?: number;
    /**
     * 
     * @type {boolean}
     * @memberof OmbiCoreModelsSearchSearchAlbumViewModel
     */
    approved?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof OmbiCoreModelsSearchSearchAlbumViewModel
     */
    requested?: boolean;
    /**
     * 
     * @type {number}
     * @memberof OmbiCoreModelsSearchSearchAlbumViewModel
     */
    requestId?: number;
    /**
     * 
     * @type {boolean}
     * @memberof OmbiCoreModelsSearchSearchAlbumViewModel
     */
    available?: boolean;
    /**
     * 
     * @type {string}
     * @memberof OmbiCoreModelsSearchSearchAlbumViewModel
     */
    plexUrl?: string;
    /**
     * 
     * @type {string}
     * @memberof OmbiCoreModelsSearchSearchAlbumViewModel
     */
    embyUrl?: string;
    /**
     * 
     * @type {string}
     * @memberof OmbiCoreModelsSearchSearchAlbumViewModel
     */
    quality?: string;
    /**
     * 
     * @type {string}
     * @memberof OmbiCoreModelsSearchSearchAlbumViewModel
     */
    imdbId?: string;
    /**
     * 
     * @type {string}
     * @memberof OmbiCoreModelsSearchSearchAlbumViewModel
     */
    theTvDbId?: string;
    /**
     * 
     * @type {string}
     * @memberof OmbiCoreModelsSearchSearchAlbumViewModel
     */
    theMovieDbId?: string;
    /**
     * 
     * @type {boolean}
     * @memberof OmbiCoreModelsSearchSearchAlbumViewModel
     */
    subscribed?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof OmbiCoreModelsSearchSearchAlbumViewModel
     */
    showSubscribe?: boolean;
}

/**
    * @export
    * @enum {string}
    */
export enum OmbiCoreModelsSearchSearchAlbumViewModelTypeEnum {
    TvShow = 'TvShow',
    Movie = 'Movie',
    Album = 'Album'
}



