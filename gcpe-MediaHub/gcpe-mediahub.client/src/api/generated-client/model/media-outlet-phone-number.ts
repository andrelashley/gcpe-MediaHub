/* tslint:disable */
/* eslint-disable */
/**
 * GCPE Media Hub 2.0 API
 * GCPE Media Hub 2.0
 *
 * The version of the OpenAPI document: v1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


// May contain unused imports in some cases
// @ts-ignore
import type { MediaOutlet } from './media-outlet';
// May contain unused imports in some cases
// @ts-ignore
import type { MediaOutletPhoneType } from './media-outlet-phone-type';

/**
 * 
 * @export
 * @interface MediaOutletPhoneNumber
 */
export interface MediaOutletPhoneNumber {
    /**
     * 
     * @type {string}
     * @memberof MediaOutletPhoneNumber
     */
    'id'?: string;
    /**
     * 
     * @type {MediaOutletPhoneType}
     * @memberof MediaOutletPhoneNumber
     */
    'mediaOutletPhoneType'?: MediaOutletPhoneType;
    /**
     * 
     * @type {string}
     * @memberof MediaOutletPhoneNumber
     */
    'phoneNumber'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof MediaOutletPhoneNumber
     */
    'mediaOutletId'?: string | null;
    /**
     * 
     * @type {MediaOutlet}
     * @memberof MediaOutletPhoneNumber
     */
    'mediaOutlet'?: MediaOutlet;
}

