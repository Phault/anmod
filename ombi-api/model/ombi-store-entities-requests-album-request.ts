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

/**
 * 
 * @export
 * @interface OmbiStoreEntitiesRequestsAlbumRequest
 */
export interface OmbiStoreEntitiesRequestsAlbumRequest {
    /**
     * 
     * @type {string}
     * @memberof OmbiStoreEntitiesRequestsAlbumRequest
     */
    foreignAlbumId?: string;
    /**
     * 
     * @type {string}
     * @memberof OmbiStoreEntitiesRequestsAlbumRequest
     */
    foreignArtistId?: string;
    /**
     * 
     * @type {string}
     * @memberof OmbiStoreEntitiesRequestsAlbumRequest
     */
    disk?: string;
    /**
     * 
     * @type {string}
     * @memberof OmbiStoreEntitiesRequestsAlbumRequest
     */
    cover?: string;
    /**
     * 
     * @type {number}
     * @memberof OmbiStoreEntitiesRequestsAlbumRequest
     */
    rating?: number;
    /**
     * 
     * @type {Date}
     * @memberof OmbiStoreEntitiesRequestsAlbumRequest
     */
    releaseDate?: Date;
    /**
     * 
     * @type {string}
     * @memberof OmbiStoreEntitiesRequestsAlbumRequest
     */
    artistName?: string;
    /**
     * 
     * @type {boolean}
     * @memberof OmbiStoreEntitiesRequestsAlbumRequest
     */
    subscribed?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof OmbiStoreEntitiesRequestsAlbumRequest
     */
    showSubscribe?: boolean;
    /**
     * 
     * @type {string}
     * @memberof OmbiStoreEntitiesRequestsAlbumRequest
     */
    title?: string;
    /**
     * 
     * @type {boolean}
     * @memberof OmbiStoreEntitiesRequestsAlbumRequest
     */
    approved?: boolean;
    /**
     * 
     * @type {Date}
     * @memberof OmbiStoreEntitiesRequestsAlbumRequest
     */
    markedAsApproved?: Date;
    /**
     * 
     * @type {Date}
     * @memberof OmbiStoreEntitiesRequestsAlbumRequest
     */
    requestedDate?: Date;
    /**
     * 
     * @type {boolean}
     * @memberof OmbiStoreEntitiesRequestsAlbumRequest
     */
    available?: boolean;
    /**
     * 
     * @type {Date}
     * @memberof OmbiStoreEntitiesRequestsAlbumRequest
     */
    markedAsAvailable?: Date;
    /**
     * 
     * @type {string}
     * @memberof OmbiStoreEntitiesRequestsAlbumRequest
     */
    requestedUserId?: string;
    /**
     * 
     * @type {boolean}
     * @memberof OmbiStoreEntitiesRequestsAlbumRequest
     */
    denied?: boolean;
    /**
     * 
     * @type {Date}
     * @memberof OmbiStoreEntitiesRequestsAlbumRequest
     */
    markedAsDenied?: Date;
    /**
     * 
     * @type {string}
     * @memberof OmbiStoreEntitiesRequestsAlbumRequest
     */
    deniedReason?: string;
    /**
     * 
     * @type {string}
     * @memberof OmbiStoreEntitiesRequestsAlbumRequest
     */
    requestType?: OmbiStoreEntitiesRequestsAlbumRequestRequestTypeEnum;
    /**
     * 
     * @type {string}
     * @memberof OmbiStoreEntitiesRequestsAlbumRequest
     */
    requestedByAlias?: string;
    /**
     * 
     * @type {OmbiStoreEntitiesOmbiUser}
     * @memberof OmbiStoreEntitiesRequestsAlbumRequest
     */
    requestedUser?: OmbiStoreEntitiesOmbiUser;
    /**
     * 
     * @type {boolean}
     * @memberof OmbiStoreEntitiesRequestsAlbumRequest
     */
    canApprove?: boolean;
    /**
     * 
     * @type {number}
     * @memberof OmbiStoreEntitiesRequestsAlbumRequest
     */
    id?: number;
}

/**
    * @export
    * @enum {string}
    */
export enum OmbiStoreEntitiesRequestsAlbumRequestRequestTypeEnum {
    TvShow = 'TvShow',
    Movie = 'Movie',
    Album = 'Album'
}



