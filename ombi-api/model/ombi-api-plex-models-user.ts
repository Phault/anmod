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


import { OmbiApiPlexModelsRoles } from './ombi-api-plex-models-roles';
import { OmbiApiPlexModelsSubscription } from './ombi-api-plex-models-subscription';

/**
 * 
 * @export
 * @interface OmbiApiPlexModelsUser
 */
export interface OmbiApiPlexModelsUser {
    /**
     * 
     * @type {string}
     * @memberof OmbiApiPlexModelsUser
     */
    id?: string;
    /**
     * 
     * @type {string}
     * @memberof OmbiApiPlexModelsUser
     */
    email?: string;
    /**
     * 
     * @type {string}
     * @memberof OmbiApiPlexModelsUser
     */
    uuid?: string;
    /**
     * 
     * @type {string}
     * @memberof OmbiApiPlexModelsUser
     */
    joinedAt?: string;
    /**
     * 
     * @type {string}
     * @memberof OmbiApiPlexModelsUser
     */
    username?: string;
    /**
     * 
     * @type {string}
     * @memberof OmbiApiPlexModelsUser
     */
    title?: string;
    /**
     * 
     * @type {string}
     * @memberof OmbiApiPlexModelsUser
     */
    thumb?: string;
    /**
     * 
     * @type {string}
     * @memberof OmbiApiPlexModelsUser
     */
    hasPassword?: string;
    /**
     * 
     * @type {string}
     * @memberof OmbiApiPlexModelsUser
     */
    authenticationToken?: string;
    /**
     * 
     * @type {OmbiApiPlexModelsSubscription}
     * @memberof OmbiApiPlexModelsUser
     */
    subscription?: OmbiApiPlexModelsSubscription;
    /**
     * 
     * @type {OmbiApiPlexModelsRoles}
     * @memberof OmbiApiPlexModelsUser
     */
    roles?: OmbiApiPlexModelsRoles;
    /**
     * 
     * @type {Array<string>}
     * @memberof OmbiApiPlexModelsUser
     */
    entitlements?: Array<string>;
    /**
     * 
     * @type {object}
     * @memberof OmbiApiPlexModelsUser
     */
    confirmedAt?: object;
    /**
     * 
     * @type {number}
     * @memberof OmbiApiPlexModelsUser
     */
    forumId?: number;
}


