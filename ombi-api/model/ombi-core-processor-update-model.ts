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


import { OmbiCoreProcessorChangeLog } from './ombi-core-processor-change-log';
import { OmbiScheduleProcessorDownloads } from './ombi-schedule-processor-downloads';

/**
 * 
 * @export
 * @interface OmbiCoreProcessorUpdateModel
 */
export interface OmbiCoreProcessorUpdateModel {
    /**
     * 
     * @type {string}
     * @memberof OmbiCoreProcessorUpdateModel
     */
    updateVersionString?: string;
    /**
     * 
     * @type {number}
     * @memberof OmbiCoreProcessorUpdateModel
     */
    updateVersion?: number;
    /**
     * 
     * @type {Date}
     * @memberof OmbiCoreProcessorUpdateModel
     */
    updateDate?: Date;
    /**
     * 
     * @type {Array<OmbiCoreProcessorChangeLog>}
     * @memberof OmbiCoreProcessorUpdateModel
     */
    changeLogs?: Array<OmbiCoreProcessorChangeLog>;
    /**
     * 
     * @type {Array<OmbiScheduleProcessorDownloads>}
     * @memberof OmbiCoreProcessorUpdateModel
     */
    downloads?: Array<OmbiScheduleProcessorDownloads>;
}


