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
import { OmbiStoreEntitiesRequestsIssueCategory } from './ombi-store-entities-requests-issue-category';
import { OmbiStoreEntitiesRequestsIssueComments } from './ombi-store-entities-requests-issue-comments';

/**
 * 
 * @export
 * @interface OmbiStoreEntitiesRequestsIssues
 */
export interface OmbiStoreEntitiesRequestsIssues {
    /**
     * 
     * @type {string}
     * @memberof OmbiStoreEntitiesRequestsIssues
     */
    title?: string;
    /**
     * 
     * @type {string}
     * @memberof OmbiStoreEntitiesRequestsIssues
     */
    requestType?: OmbiStoreEntitiesRequestsIssuesRequestTypeEnum;
    /**
     * 
     * @type {string}
     * @memberof OmbiStoreEntitiesRequestsIssues
     */
    providerId?: string;
    /**
     * 
     * @type {number}
     * @memberof OmbiStoreEntitiesRequestsIssues
     */
    requestId?: number;
    /**
     * 
     * @type {string}
     * @memberof OmbiStoreEntitiesRequestsIssues
     */
    subject?: string;
    /**
     * 
     * @type {string}
     * @memberof OmbiStoreEntitiesRequestsIssues
     */
    description?: string;
    /**
     * 
     * @type {number}
     * @memberof OmbiStoreEntitiesRequestsIssues
     */
    issueCategoryId?: number;
    /**
     * 
     * @type {OmbiStoreEntitiesRequestsIssueCategory}
     * @memberof OmbiStoreEntitiesRequestsIssues
     */
    issueCategory?: OmbiStoreEntitiesRequestsIssueCategory;
    /**
     * 
     * @type {string}
     * @memberof OmbiStoreEntitiesRequestsIssues
     */
    status?: OmbiStoreEntitiesRequestsIssuesStatusEnum;
    /**
     * 
     * @type {Date}
     * @memberof OmbiStoreEntitiesRequestsIssues
     */
    resovledDate?: Date;
    /**
     * 
     * @type {string}
     * @memberof OmbiStoreEntitiesRequestsIssues
     */
    userReportedId?: string;
    /**
     * 
     * @type {OmbiStoreEntitiesOmbiUser}
     * @memberof OmbiStoreEntitiesRequestsIssues
     */
    userReported?: OmbiStoreEntitiesOmbiUser;
    /**
     * 
     * @type {Array<OmbiStoreEntitiesRequestsIssueComments>}
     * @memberof OmbiStoreEntitiesRequestsIssues
     */
    comments?: Array<OmbiStoreEntitiesRequestsIssueComments>;
    /**
     * 
     * @type {number}
     * @memberof OmbiStoreEntitiesRequestsIssues
     */
    id?: number;
}

/**
    * @export
    * @enum {string}
    */
export enum OmbiStoreEntitiesRequestsIssuesRequestTypeEnum {
    TvShow = 'TvShow',
    Movie = 'Movie',
    Album = 'Album'
}
/**
    * @export
    * @enum {string}
    */
export enum OmbiStoreEntitiesRequestsIssuesStatusEnum {
    Pending = 'Pending',
    InProgress = 'InProgress',
    Resolved = 'Resolved',
    Deleted = 'Deleted'
}


