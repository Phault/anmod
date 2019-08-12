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


import { OmbiStoreEntitiesOmbiUser } from './ombi-store-entities-ombi-user';

/**
 * 
 * @export
 * @interface OmbiCoreModelsMassEmailModel
 */
export interface OmbiCoreModelsMassEmailModel {
    /**
     * 
     * @type {string}
     * @memberof OmbiCoreModelsMassEmailModel
     */
    subject?: string;
    /**
     * 
     * @type {string}
     * @memberof OmbiCoreModelsMassEmailModel
     */
    body?: string;
    /**
     * 
     * @type {Array<OmbiStoreEntitiesOmbiUser>}
     * @memberof OmbiCoreModelsMassEmailModel
     */
    users?: Array<OmbiStoreEntitiesOmbiUser>;
}

