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


import { OmbiApiRadarrModelsQuality } from './ombi-api-radarr-models-quality';

/**
 * 
 * @export
 * @interface OmbiApiRadarrModelsItem
 */
export interface OmbiApiRadarrModelsItem {
    /**
     * 
     * @type {OmbiApiRadarrModelsQuality}
     * @memberof OmbiApiRadarrModelsItem
     */
    quality?: OmbiApiRadarrModelsQuality;
    /**
     * 
     * @type {boolean}
     * @memberof OmbiApiRadarrModelsItem
     */
    allowed?: boolean;
}


