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


import { OmbiCoreModelsRequestsEpisodesViewModel } from './ombi-core-models-requests-episodes-view-model';

/**
 * 
 * @export
 * @interface OmbiCoreModelsRequestsSeasonsViewModel
 */
export interface OmbiCoreModelsRequestsSeasonsViewModel {
    /**
     * 
     * @type {number}
     * @memberof OmbiCoreModelsRequestsSeasonsViewModel
     */
    seasonNumber?: number;
    /**
     * 
     * @type {Array<OmbiCoreModelsRequestsEpisodesViewModel>}
     * @memberof OmbiCoreModelsRequestsSeasonsViewModel
     */
    episodes?: Array<OmbiCoreModelsRequestsEpisodesViewModel>;
}


