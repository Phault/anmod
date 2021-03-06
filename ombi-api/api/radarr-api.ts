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


import * as url from 'url';
import globalAxios, { AxiosPromise, AxiosInstance } from 'axios';
import { Configuration } from '../configuration';
import { BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError } from '../base';

import { OmbiApiRadarrModelsRadarrProfile } from '../model';
import { OmbiApiRadarrModelsRadarrRootFolder } from '../model';
import { OmbiSettingsSettingsModelsExternalRadarrSettings } from '../model';
/**
 * RadarrApi - axios parameter creator
 * @export
 */
export const RadarrApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary Gets the Radarr profiles using the saved settings  <remarks>The data is cached for an hour</remarks>
         * @param {object} [apiKey] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        radarrProfilesGet(apiKey?: object, options: any = {}): RequestArgs {
            const localVarPath = `/api/v1/Radarr/Profiles`;
            const localVarUrlObj = url.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication ApiKey required
            if (configuration && configuration.apiKey) {
                const localVarApiKeyValue = typeof configuration.apiKey === 'function'
                    ? configuration.apiKey("ApiKey")
                    : configuration.apiKey;
                localVarHeaderParameter["ApiKey"] = localVarApiKeyValue;
            }

            if (apiKey !== undefined && apiKey !== null) {
                localVarHeaderParameter['ApiKey'] = String(apiKey);
            }


                localVarUrlObj.query = {...localVarUrlObj.query, ...localVarQueryParameter, ...options.query};
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...options.headers};

            return {
                url: url.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Gets the Radarr profiles.
         * @param {object} [apiKey] 
         * @param {OmbiSettingsSettingsModelsExternalRadarrSettings} [settings] The settings.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        radarrProfilesPost(apiKey?: object, settings?: OmbiSettingsSettingsModelsExternalRadarrSettings, options: any = {}): RequestArgs {
            const localVarPath = `/api/v1/Radarr/Profiles`;
            const localVarUrlObj = url.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication ApiKey required
            if (configuration && configuration.apiKey) {
                const localVarApiKeyValue = typeof configuration.apiKey === 'function'
                    ? configuration.apiKey("ApiKey")
                    : configuration.apiKey;
                localVarHeaderParameter["ApiKey"] = localVarApiKeyValue;
            }

            if (apiKey !== undefined && apiKey !== null) {
                localVarHeaderParameter['ApiKey'] = String(apiKey);
            }


                localVarHeaderParameter['Content-Type'] = 'application/json-patch+json';

            localVarUrlObj.query = {...localVarUrlObj.query, ...localVarQueryParameter, ...options.query};
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...options.headers};
            const needsSerialization = (<any>"OmbiSettingsSettingsModelsExternalRadarrSettings" !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data =  needsSerialization ? JSON.stringify(settings !== undefined ? settings : {}) : (settings || "");

            return {
                url: url.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Gets the Radarr root folders using the saved settings.  <remarks>The data is cached for an hour</remarks>
         * @param {object} [apiKey] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        radarrRootFoldersGet(apiKey?: object, options: any = {}): RequestArgs {
            const localVarPath = `/api/v1/Radarr/RootFolders`;
            const localVarUrlObj = url.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication ApiKey required
            if (configuration && configuration.apiKey) {
                const localVarApiKeyValue = typeof configuration.apiKey === 'function'
                    ? configuration.apiKey("ApiKey")
                    : configuration.apiKey;
                localVarHeaderParameter["ApiKey"] = localVarApiKeyValue;
            }

            if (apiKey !== undefined && apiKey !== null) {
                localVarHeaderParameter['ApiKey'] = String(apiKey);
            }


                localVarUrlObj.query = {...localVarUrlObj.query, ...localVarQueryParameter, ...options.query};
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...options.headers};

            return {
                url: url.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Gets the Radarr root folders.
         * @param {object} [apiKey] 
         * @param {OmbiSettingsSettingsModelsExternalRadarrSettings} [settings] The settings.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        radarrRootFoldersPost(apiKey?: object, settings?: OmbiSettingsSettingsModelsExternalRadarrSettings, options: any = {}): RequestArgs {
            const localVarPath = `/api/v1/Radarr/RootFolders`;
            const localVarUrlObj = url.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication ApiKey required
            if (configuration && configuration.apiKey) {
                const localVarApiKeyValue = typeof configuration.apiKey === 'function'
                    ? configuration.apiKey("ApiKey")
                    : configuration.apiKey;
                localVarHeaderParameter["ApiKey"] = localVarApiKeyValue;
            }

            if (apiKey !== undefined && apiKey !== null) {
                localVarHeaderParameter['ApiKey'] = String(apiKey);
            }


                localVarHeaderParameter['Content-Type'] = 'application/json-patch+json';

            localVarUrlObj.query = {...localVarUrlObj.query, ...localVarQueryParameter, ...options.query};
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...options.headers};
            const needsSerialization = (<any>"OmbiSettingsSettingsModelsExternalRadarrSettings" !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data =  needsSerialization ? JSON.stringify(settings !== undefined ? settings : {}) : (settings || "");

            return {
                url: url.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * RadarrApi - functional programming interface
 * @export
 */
export const RadarrApiFp = function(configuration?: Configuration) {
    return {
        /**
         * 
         * @summary Gets the Radarr profiles using the saved settings  <remarks>The data is cached for an hour</remarks>
         * @param {object} [apiKey] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        radarrProfilesGet(apiKey?: object, options?: any): (axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<OmbiApiRadarrModelsRadarrProfile>> {
            const localVarAxiosArgs = RadarrApiAxiosParamCreator(configuration).radarrProfilesGet(apiKey, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary Gets the Radarr profiles.
         * @param {object} [apiKey] 
         * @param {OmbiSettingsSettingsModelsExternalRadarrSettings} [settings] The settings.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        radarrProfilesPost(apiKey?: object, settings?: OmbiSettingsSettingsModelsExternalRadarrSettings, options?: any): (axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<OmbiApiRadarrModelsRadarrProfile>> {
            const localVarAxiosArgs = RadarrApiAxiosParamCreator(configuration).radarrProfilesPost(apiKey, settings, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary Gets the Radarr root folders using the saved settings.  <remarks>The data is cached for an hour</remarks>
         * @param {object} [apiKey] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        radarrRootFoldersGet(apiKey?: object, options?: any): (axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<OmbiApiRadarrModelsRadarrRootFolder>> {
            const localVarAxiosArgs = RadarrApiAxiosParamCreator(configuration).radarrRootFoldersGet(apiKey, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary Gets the Radarr root folders.
         * @param {object} [apiKey] 
         * @param {OmbiSettingsSettingsModelsExternalRadarrSettings} [settings] The settings.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        radarrRootFoldersPost(apiKey?: object, settings?: OmbiSettingsSettingsModelsExternalRadarrSettings, options?: any): (axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<OmbiApiRadarrModelsRadarrRootFolder>> {
            const localVarAxiosArgs = RadarrApiAxiosParamCreator(configuration).radarrRootFoldersPost(apiKey, settings, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
    }
};

/**
 * RadarrApi - factory interface
 * @export
 */
export const RadarrApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    return {
        /**
         * 
         * @summary Gets the Radarr profiles using the saved settings  <remarks>The data is cached for an hour</remarks>
         * @param {object} [apiKey] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        radarrProfilesGet(apiKey?: object, options?: any) {
            return RadarrApiFp(configuration).radarrProfilesGet(apiKey, options)(axios, basePath);
        },
        /**
         * 
         * @summary Gets the Radarr profiles.
         * @param {object} [apiKey] 
         * @param {OmbiSettingsSettingsModelsExternalRadarrSettings} [settings] The settings.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        radarrProfilesPost(apiKey?: object, settings?: OmbiSettingsSettingsModelsExternalRadarrSettings, options?: any) {
            return RadarrApiFp(configuration).radarrProfilesPost(apiKey, settings, options)(axios, basePath);
        },
        /**
         * 
         * @summary Gets the Radarr root folders using the saved settings.  <remarks>The data is cached for an hour</remarks>
         * @param {object} [apiKey] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        radarrRootFoldersGet(apiKey?: object, options?: any) {
            return RadarrApiFp(configuration).radarrRootFoldersGet(apiKey, options)(axios, basePath);
        },
        /**
         * 
         * @summary Gets the Radarr root folders.
         * @param {object} [apiKey] 
         * @param {OmbiSettingsSettingsModelsExternalRadarrSettings} [settings] The settings.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        radarrRootFoldersPost(apiKey?: object, settings?: OmbiSettingsSettingsModelsExternalRadarrSettings, options?: any) {
            return RadarrApiFp(configuration).radarrRootFoldersPost(apiKey, settings, options)(axios, basePath);
        },
    };
};

/**
 * RadarrApi - object-oriented interface
 * @export
 * @class RadarrApi
 * @extends {BaseAPI}
 */
export class RadarrApi extends BaseAPI {
    /**
     * 
     * @summary Gets the Radarr profiles using the saved settings  <remarks>The data is cached for an hour</remarks>
     * @param {object} [apiKey] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof RadarrApi
     */
    public radarrProfilesGet(apiKey?: object, options?: any) {
        return RadarrApiFp(this.configuration).radarrProfilesGet(apiKey, options)(this.axios, this.basePath);
    }

    /**
     * 
     * @summary Gets the Radarr profiles.
     * @param {object} [apiKey] 
     * @param {OmbiSettingsSettingsModelsExternalRadarrSettings} [settings] The settings.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof RadarrApi
     */
    public radarrProfilesPost(apiKey?: object, settings?: OmbiSettingsSettingsModelsExternalRadarrSettings, options?: any) {
        return RadarrApiFp(this.configuration).radarrProfilesPost(apiKey, settings, options)(this.axios, this.basePath);
    }

    /**
     * 
     * @summary Gets the Radarr root folders using the saved settings.  <remarks>The data is cached for an hour</remarks>
     * @param {object} [apiKey] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof RadarrApi
     */
    public radarrRootFoldersGet(apiKey?: object, options?: any) {
        return RadarrApiFp(this.configuration).radarrRootFoldersGet(apiKey, options)(this.axios, this.basePath);
    }

    /**
     * 
     * @summary Gets the Radarr root folders.
     * @param {object} [apiKey] 
     * @param {OmbiSettingsSettingsModelsExternalRadarrSettings} [settings] The settings.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof RadarrApi
     */
    public radarrRootFoldersPost(apiKey?: object, settings?: OmbiSettingsSettingsModelsExternalRadarrSettings, options?: any) {
        return RadarrApiFp(this.configuration).radarrRootFoldersPost(apiKey, settings, options)(this.axios, this.basePath);
    }

}
