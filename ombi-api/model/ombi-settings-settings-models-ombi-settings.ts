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
 * @interface OmbiSettingsSettingsModelsOmbiSettings
 */
export interface OmbiSettingsSettingsModelsOmbiSettings {
    /**
     * 
     * @type {string}
     * @memberof OmbiSettingsSettingsModelsOmbiSettings
     */
    baseUrl?: string;
    /**
     * 
     * @type {boolean}
     * @memberof OmbiSettingsSettingsModelsOmbiSettings
     */
    collectAnalyticData?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof OmbiSettingsSettingsModelsOmbiSettings
     */
    set?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof OmbiSettingsSettingsModelsOmbiSettings
     */
    wizard?: boolean;
    /**
     * 
     * @type {string}
     * @memberof OmbiSettingsSettingsModelsOmbiSettings
     */
    apiKey?: string;
    /**
     * 
     * @type {boolean}
     * @memberof OmbiSettingsSettingsModelsOmbiSettings
     */
    ignoreCertificateErrors?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof OmbiSettingsSettingsModelsOmbiSettings
     */
    doNotSendNotificationsForAutoApprove?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof OmbiSettingsSettingsModelsOmbiSettings
     */
    hideRequestsUsers?: boolean;
    /**
     * 
     * @type {string}
     * @memberof OmbiSettingsSettingsModelsOmbiSettings
     */
    defaultLanguageCode?: string;
    /**
     * 
     * @type {number}
     * @memberof OmbiSettingsSettingsModelsOmbiSettings
     */
    id?: number;
}

