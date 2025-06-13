# MediaTypesApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**apiMediaTypesGet**](#apimediatypesget) | **GET** /api/MediaTypes | |
|[**apiMediaTypesIdDelete**](#apimediatypesiddelete) | **DELETE** /api/MediaTypes/{id} | |
|[**apiMediaTypesIdGet**](#apimediatypesidget) | **GET** /api/MediaTypes/{id} | |
|[**apiMediaTypesIdPut**](#apimediatypesidput) | **PUT** /api/MediaTypes/{id} | |
|[**apiMediaTypesPost**](#apimediatypespost) | **POST** /api/MediaTypes | |

# **apiMediaTypesGet**
> Array<MediaType> apiMediaTypesGet()


### Example

```typescript
import {
    MediaTypesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new MediaTypesApi(configuration);

const { status, data } = await apiInstance.apiMediaTypesGet();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<MediaType>**

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

# **apiMediaTypesIdDelete**
> apiMediaTypesIdDelete()


### Example

```typescript
import {
    MediaTypesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new MediaTypesApi(configuration);

let id: number; // (default to undefined)

const { status, data } = await apiInstance.apiMediaTypesIdDelete(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] |  | defaults to undefined|


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

# **apiMediaTypesIdGet**
> MediaType apiMediaTypesIdGet()


### Example

```typescript
import {
    MediaTypesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new MediaTypesApi(configuration);

let id: number; // (default to undefined)

const { status, data } = await apiInstance.apiMediaTypesIdGet(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] |  | defaults to undefined|


### Return type

**MediaType**

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

# **apiMediaTypesIdPut**
> apiMediaTypesIdPut()


### Example

```typescript
import {
    MediaTypesApi,
    Configuration,
    MediaType
} from './api';

const configuration = new Configuration();
const apiInstance = new MediaTypesApi(configuration);

let id: number; // (default to undefined)
let mediaType: MediaType; // (optional)

const { status, data } = await apiInstance.apiMediaTypesIdPut(
    id,
    mediaType
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **mediaType** | **MediaType**|  | |
| **id** | [**number**] |  | defaults to undefined|


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

# **apiMediaTypesPost**
> MediaType apiMediaTypesPost()


### Example

```typescript
import {
    MediaTypesApi,
    Configuration,
    MediaType
} from './api';

const configuration = new Configuration();
const apiInstance = new MediaTypesApi(configuration);

let mediaType: MediaType; // (optional)

const { status, data } = await apiInstance.apiMediaTypesPost(
    mediaType
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **mediaType** | **MediaType**|  | |


### Return type

**MediaType**

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

