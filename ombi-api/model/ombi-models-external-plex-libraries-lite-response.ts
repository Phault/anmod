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


import { OmbiApiPlexModelsSectionLite } from './ombi-api-plex-models-section-lite';

/**
 * 
 * @export
 * @interface OmbiModelsExternalPlexLibrariesLiteResponse
 */
export interface OmbiModelsExternalPlexLibrariesLiteResponse {
    /**
     * 
     * @type {Array<OmbiApiPlexModelsSectionLite>}
     * @memberof OmbiModelsExternalPlexLibrariesLiteResponse
     */
    data?: Array<OmbiApiPlexModelsSectionLite>;
    /**
     * 
     * @type {boolean}
     * @memberof OmbiModelsExternalPlexLibrariesLiteResponse
     */
    successful?: boolean;
    /**
     * 
     * @type {string}
     * @memberof OmbiModelsExternalPlexLibrariesLiteResponse
     */
    message?: string;
}


