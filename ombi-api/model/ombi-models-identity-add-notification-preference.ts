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
 * @interface OmbiModelsIdentityAddNotificationPreference
 */
export interface OmbiModelsIdentityAddNotificationPreference {
    /**
     * 
     * @type {string}
     * @memberof OmbiModelsIdentityAddNotificationPreference
     */
    agent?: OmbiModelsIdentityAddNotificationPreferenceAgentEnum;
    /**
     * 
     * @type {string}
     * @memberof OmbiModelsIdentityAddNotificationPreference
     */
    userId?: string;
    /**
     * 
     * @type {string}
     * @memberof OmbiModelsIdentityAddNotificationPreference
     */
    value?: string;
    /**
     * 
     * @type {boolean}
     * @memberof OmbiModelsIdentityAddNotificationPreference
     */
    enabled?: boolean;
}

/**
    * @export
    * @enum {string}
    */
export enum OmbiModelsIdentityAddNotificationPreferenceAgentEnum {
    Email = 'Email',
    Discord = 'Discord',
    Pushbullet = 'Pushbullet',
    Pushover = 'Pushover',
    Telegram = 'Telegram',
    Slack = 'Slack',
    Mattermost = 'Mattermost',
    Mobile = 'Mobile'
}



