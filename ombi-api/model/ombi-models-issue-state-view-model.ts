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
 * @interface OmbiModelsIssueStateViewModel
 */
export interface OmbiModelsIssueStateViewModel {
    /**
     * 
     * @type {number}
     * @memberof OmbiModelsIssueStateViewModel
     */
    issueId?: number;
    /**
     * 
     * @type {string}
     * @memberof OmbiModelsIssueStateViewModel
     */
    status?: OmbiModelsIssueStateViewModelStatusEnum;
}

/**
    * @export
    * @enum {string}
    */
export enum OmbiModelsIssueStateViewModelStatusEnum {
    Pending = 'Pending',
    InProgress = 'InProgress',
    Resolved = 'Resolved',
    Deleted = 'Deleted'
}


