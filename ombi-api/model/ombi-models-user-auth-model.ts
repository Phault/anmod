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


import { OmbiApiPlexModelsOAuthOAuthPin } from './ombi-api-plex-models-oauth-oauth-pin';

/**
 * 
 * @export
 * @interface OmbiModelsUserAuthModel
 */
export interface OmbiModelsUserAuthModel {
    /**
     * 
     * @type {string}
     * @memberof OmbiModelsUserAuthModel
     */
    username?: string;
    /**
     * 
     * @type {string}
     * @memberof OmbiModelsUserAuthModel
     */
    password?: string;
    /**
     * 
     * @type {boolean}
     * @memberof OmbiModelsUserAuthModel
     */
    rememberMe?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof OmbiModelsUserAuthModel
     */
    usePlexAdminAccount?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof OmbiModelsUserAuthModel
     */
    usePlexOAuth?: boolean;
    /**
     * 
     * @type {OmbiApiPlexModelsOAuthOAuthPin}
     * @memberof OmbiModelsUserAuthModel
     */
    plexTvPin?: OmbiApiPlexModelsOAuthOAuthPin;
}


