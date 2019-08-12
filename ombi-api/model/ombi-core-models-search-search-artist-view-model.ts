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


import { OmbiApiLidarrModelsLink } from './ombi-api-lidarr-models-link';

/**
 * 
 * @export
 * @interface OmbiCoreModelsSearchSearchArtistViewModel
 */
export interface OmbiCoreModelsSearchSearchArtistViewModel {
    /**
     * 
     * @type {string}
     * @memberof OmbiCoreModelsSearchSearchArtistViewModel
     */
    artistName?: string;
    /**
     * 
     * @type {string}
     * @memberof OmbiCoreModelsSearchSearchArtistViewModel
     */
    forignArtistId?: string;
    /**
     * 
     * @type {string}
     * @memberof OmbiCoreModelsSearchSearchArtistViewModel
     */
    overview?: string;
    /**
     * 
     * @type {string}
     * @memberof OmbiCoreModelsSearchSearchArtistViewModel
     */
    disambiguation?: string;
    /**
     * 
     * @type {string}
     * @memberof OmbiCoreModelsSearchSearchArtistViewModel
     */
    banner?: string;
    /**
     * 
     * @type {string}
     * @memberof OmbiCoreModelsSearchSearchArtistViewModel
     */
    poster?: string;
    /**
     * 
     * @type {string}
     * @memberof OmbiCoreModelsSearchSearchArtistViewModel
     */
    logo?: string;
    /**
     * 
     * @type {boolean}
     * @memberof OmbiCoreModelsSearchSearchArtistViewModel
     */
    monitored?: boolean;
    /**
     * 
     * @type {string}
     * @memberof OmbiCoreModelsSearchSearchArtistViewModel
     */
    artistType?: string;
    /**
     * 
     * @type {string}
     * @memberof OmbiCoreModelsSearchSearchArtistViewModel
     */
    cleanName?: string;
    /**
     * 
     * @type {Array<OmbiApiLidarrModelsLink>}
     * @memberof OmbiCoreModelsSearchSearchArtistViewModel
     */
    links?: Array<OmbiApiLidarrModelsLink>;
}

