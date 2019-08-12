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
 * @interface OmbiApiCouchPotatoModelsProfileList
 */
export interface OmbiApiCouchPotatoModelsProfileList {
    /**
     * 
     * @type {boolean}
     * @memberof OmbiApiCouchPotatoModelsProfileList
     */
    core?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof OmbiApiCouchPotatoModelsProfileList
     */
    hide?: boolean;
    /**
     * 
     * @type {string}
     * @memberof OmbiApiCouchPotatoModelsProfileList
     */
    rev?: string;
    /**
     * 
     * @type {Array<boolean>}
     * @memberof OmbiApiCouchPotatoModelsProfileList
     */
    finish?: Array<boolean>;
    /**
     * 
     * @type {Array<string>}
     * @memberof OmbiApiCouchPotatoModelsProfileList
     */
    qualities?: Array<string>;
    /**
     * 
     * @type {string}
     * @memberof OmbiApiCouchPotatoModelsProfileList
     */
    id?: string;
    /**
     * 
     * @type {string}
     * @memberof OmbiApiCouchPotatoModelsProfileList
     */
    t?: string;
    /**
     * 
     * @type {string}
     * @memberof OmbiApiCouchPotatoModelsProfileList
     */
    label?: string;
    /**
     * 
     * @type {number}
     * @memberof OmbiApiCouchPotatoModelsProfileList
     */
    minimumScore?: number;
    /**
     * 
     * @type {Array<number>}
     * @memberof OmbiApiCouchPotatoModelsProfileList
     */
    stopAfter?: Array<number>;
    /**
     * 
     * @type {Array<object>}
     * @memberof OmbiApiCouchPotatoModelsProfileList
     */
    waitFor?: Array<object>;
    /**
     * 
     * @type {number}
     * @memberof OmbiApiCouchPotatoModelsProfileList
     */
    order?: number;
    /**
     * 
     * @type {Array<object>}
     * @memberof OmbiApiCouchPotatoModelsProfileList
     */
    _3d?: Array<object>;
}

