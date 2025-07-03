# MediaOutletsApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**apiMediaOutletsDropdownsGet**](#apimediaoutletsdropdownsget) | **GET** /api/MediaOutlets/dropdowns | |
|[**apiMediaOutletsGet**](#apimediaoutletsget) | **GET** /api/MediaOutlets | |
|[**apiMediaOutletsIdDelete**](#apimediaoutletsiddelete) | **DELETE** /api/MediaOutlets/{id} | |
|[**apiMediaOutletsIdGet**](#apimediaoutletsidget) | **GET** /api/MediaOutlets/{id} | |
|[**apiMediaOutletsIdPut**](#apimediaoutletsidput) | **PUT** /api/MediaOutlets/{id} | |
|[**apiMediaOutletsPost**](#apimediaoutletspost) | **POST** /api/MediaOutlets | |

# **apiMediaOutletsDropdownsGet**
> apiMediaOutletsDropdownsGet()


### Example

```typescript
import {
    MediaOutletsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new MediaOutletsApi(configuration);

const { status, data } = await apiInstance.apiMediaOutletsDropdownsGet();
```

### Parameters
This endpoint does not have any parameters.


### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiMediaOutletsGet**
> Array<OrganizationListDto> apiMediaOutletsGet()


### Example

```typescript
import {
    MediaOutletsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new MediaOutletsApi(configuration);

const { status, data } = await apiInstance.apiMediaOutletsGet();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<OrganizationListDto>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: text/plain, application/json, text/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiMediaOutletsIdDelete**
> apiMediaOutletsIdDelete()


### Example

```typescript
import {
    MediaOutletsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new MediaOutletsApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.apiMediaOutletsIdDelete(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiMediaOutletsIdGet**
> MediaOutlet apiMediaOutletsIdGet()


### Example

```typescript
import {
    MediaOutletsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new MediaOutletsApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.apiMediaOutletsIdGet(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


### Return type

**MediaOutlet**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: text/plain, application/json, text/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiMediaOutletsIdPut**
> apiMediaOutletsIdPut()


### Example

```typescript
import {
    MediaOutletsApi,
    Configuration,
    MediaOutlet
} from './api';

const configuration = new Configuration();
const apiInstance = new MediaOutletsApi(configuration);

let id: string; // (default to undefined)
let mediaOutlet: MediaOutlet; // (optional)

const { status, data } = await apiInstance.apiMediaOutletsIdPut(
    id,
    mediaOutlet
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **mediaOutlet** | **MediaOutlet**|  | |
| **id** | [**string**] |  | defaults to undefined|


### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json, text/json, application/*+json
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiMediaOutletsPost**
> MediaOutlet apiMediaOutletsPost()


### Example

```typescript
import {
    MediaOutletsApi,
    Configuration,
    CreateOrganizationDto
} from './api';

const configuration = new Configuration();
const apiInstance = new MediaOutletsApi(configuration);

let createOrganizationDto: CreateOrganizationDto; // (optional)

const { status, data } = await apiInstance.apiMediaOutletsPost(
    createOrganizationDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createOrganizationDto** | **CreateOrganizationDto**|  | |


### Return type

**MediaOutlet**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json, text/json, application/*+json
 - **Accept**: text/plain, application/json, text/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

