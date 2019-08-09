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


import { OmbiStoreEntitiesRequestsChildRequests } from './ombi-store-entities-requests-child-requests';
import { OmbiStoreRepositoryRequestsEpisodeRequests } from './ombi-store-repository-requests-episode-requests';

/**
 * 
 * @export
 * @interface OmbiStoreRepositoryRequestsSeasonRequests
 */
export interface OmbiStoreRepositoryRequestsSeasonRequests {
    /**
     * 
     * @type {number}
     * @memberof OmbiStoreRepositoryRequestsSeasonRequests
     */
    seasonNumber?: number;
    /**
     * 
     * @type {Array<OmbiStoreRepositoryRequestsEpisodeRequests>}
     * @memberof OmbiStoreRepositoryRequestsSeasonRequests
     */
    episodes?: Array<OmbiStoreRepositoryRequestsEpisodeRequests>;
    /**
     * 
     * @type {number}
     * @memberof OmbiStoreRepositoryRequestsSeasonRequests
     */
    childRequestId?: number;
    /**
     * 
     * @type {OmbiStoreEntitiesRequestsChildRequests}
     * @memberof OmbiStoreRepositoryRequestsSeasonRequests
     */
    childRequest?: OmbiStoreEntitiesRequestsChildRequests;
    /**
     * 
     * @type {number}
     * @memberof OmbiStoreRepositoryRequestsSeasonRequests
     */
    id?: number;
}


