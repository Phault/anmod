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


import { OmbiApiPlexModelsOAuthLocation } from './ombi-api-plex-models-oauth-location';

/**
 * 
 * @export
 * @interface OmbiApiPlexModelsOAuthOAuthPin
 */
export interface OmbiApiPlexModelsOAuthOAuthPin {
    /**
     * 
     * @type {number}
     * @memberof OmbiApiPlexModelsOAuthOAuthPin
     */
    id?: number;
    /**
     * 
     * @type {string}
     * @memberof OmbiApiPlexModelsOAuthOAuthPin
     */
    code?: string;
    /**
     * 
     * @type {boolean}
     * @memberof OmbiApiPlexModelsOAuthOAuthPin
     */
    trusted?: boolean;
    /**
     * 
     * @type {string}
     * @memberof OmbiApiPlexModelsOAuthOAuthPin
     */
    clientIdentifier?: string;
    /**
     * 
     * @type {OmbiApiPlexModelsOAuthLocation}
     * @memberof OmbiApiPlexModelsOAuthOAuthPin
     */
    location?: OmbiApiPlexModelsOAuthLocation;
    /**
     * 
     * @type {number}
     * @memberof OmbiApiPlexModelsOAuthOAuthPin
     */
    expiresIn?: number;
    /**
     * 
     * @type {Date}
     * @memberof OmbiApiPlexModelsOAuthOAuthPin
     */
    createdAt?: Date;
    /**
     * 
     * @type {Date}
     * @memberof OmbiApiPlexModelsOAuthOAuthPin
     */
    expiresAt?: Date;
    /**
     * 
     * @type {string}
     * @memberof OmbiApiPlexModelsOAuthOAuthPin
     */
    authToken?: string;
}


