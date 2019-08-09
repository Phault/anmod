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


import { OmbiApiLidarrModelsItem } from './ombi-api-lidarr-models-item';

/**
 * 
 * @export
 * @interface OmbiApiLidarrModelsLidarrProfile
 */
export interface OmbiApiLidarrModelsLidarrProfile {
    /**
     * 
     * @type {string}
     * @memberof OmbiApiLidarrModelsLidarrProfile
     */
    name?: string;
    /**
     * 
     * @type {Array<OmbiApiLidarrModelsItem>}
     * @memberof OmbiApiLidarrModelsLidarrProfile
     */
    items?: Array<OmbiApiLidarrModelsItem>;
    /**
     * 
     * @type {number}
     * @memberof OmbiApiLidarrModelsLidarrProfile
     */
    id?: number;
}


