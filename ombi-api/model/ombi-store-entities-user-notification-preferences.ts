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
 * @interface OmbiStoreEntitiesUserNotificationPreferences
 */
export interface OmbiStoreEntitiesUserNotificationPreferences {
    /**
     * 
     * @type {string}
     * @memberof OmbiStoreEntitiesUserNotificationPreferences
     */
    userId?: string;
    /**
     * 
     * @type {string}
     * @memberof OmbiStoreEntitiesUserNotificationPreferences
     */
    agent?: OmbiStoreEntitiesUserNotificationPreferencesAgentEnum;
    /**
     * 
     * @type {boolean}
     * @memberof OmbiStoreEntitiesUserNotificationPreferences
     */
    enabled?: boolean;
    /**
     * 
     * @type {string}
     * @memberof OmbiStoreEntitiesUserNotificationPreferences
     */
    value?: string;
    /**
     * 
     * @type {number}
     * @memberof OmbiStoreEntitiesUserNotificationPreferences
     */
    id?: number;
}

/**
    * @export
    * @enum {string}
    */
export enum OmbiStoreEntitiesUserNotificationPreferencesAgentEnum {
    Email = 'Email',
    Discord = 'Discord',
    Pushbullet = 'Pushbullet',
    Pushover = 'Pushover',
    Telegram = 'Telegram',
    Slack = 'Slack',
    Mattermost = 'Mattermost',
    Mobile = 'Mobile'
}


