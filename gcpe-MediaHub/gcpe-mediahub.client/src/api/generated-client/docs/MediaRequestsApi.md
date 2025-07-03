# MediaRequestsApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**apiMediaRequestsByRequestNoRequestNoGet**](#apimediarequestsbyrequestnorequestnoget) | **GET** /api/MediaRequests/byRequestNo/{requestNo} | |
|[**apiMediaRequestsDtosGet**](#apimediarequestsdtosget) | **GET** /api/MediaRequests/dtos | |
|[**apiMediaRequestsGet**](#apimediarequestsget) | **GET** /api/MediaRequests | |
|[**apiMediaRequestsIdDelete**](#apimediarequestsiddelete) | **DELETE** /api/MediaRequests/{id} | |
|[**apiMediaRequestsIdGet**](#apimediarequestsidget) | **GET** /api/MediaRequests/{id} | |
|[**apiMediaRequestsIdPut**](#apimediarequestsidput) | **PUT** /api/MediaRequests/{id} | |
|[**apiMediaRequestsPost**](#apimediarequestspost) | **POST** /api/MediaRequests | |

# **apiMediaRequestsByRequestNoRequestNoGet**
> MediaRequest apiMediaRequestsByRequestNoRequestNoGet()


### Example

```typescript
import {
    MediaRequestsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new MediaRequestsApi(configuration);

let requestNo: number; // (default to undefined)

const { status, data } = await apiInstance.apiMediaRequestsByRequestNoRequestNoGet(
    requestNo
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **requestNo** | [**number**] |  | defaults to undefined|


### Return type

**MediaRequest**

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

# **apiMediaRequestsDtosGet**
> Array<RequestDto> apiMediaRequestsDtosGet()


### Example

```typescript
import {
    MediaRequestsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new MediaRequestsApi(configuration);

const { status, data } = await apiInstance.apiMediaRequestsDtosGet();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<RequestDto>**

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

# **apiMediaRequestsGet**
> Array<MediaRequest> apiMediaRequestsGet()


### Example

```typescript
import {
    MediaRequestsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new MediaRequestsApi(configuration);

const { status, data } = await apiInstance.apiMediaRequestsGet();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<MediaRequest>**

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

# **apiMediaRequestsIdDelete**
> apiMediaRequestsIdDelete()


### Example

```typescript
import {
    MediaRequestsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new MediaRequestsApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.apiMediaRequestsIdDelete(
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

# **apiMediaRequestsIdGet**
> MediaRequest apiMediaRequestsIdGet()


### Example

```typescript
import {
    MediaRequestsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new MediaRequestsApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.apiMediaRequestsIdGet(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


### Return type

**MediaRequest**

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

# **apiMediaRequestsIdPut**
> apiMediaRequestsIdPut()


### Example

```typescript
import {
    MediaRequestsApi,
    Configuration,
    MediaRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new MediaRequestsApi(configuration);

let id: string; // (default to undefined)
let mediaRequest: MediaRequest; // (optional)

const { status, data } = await apiInstance.apiMediaRequestsIdPut(
    id,
    mediaRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **mediaRequest** | **MediaRequest**|  | |
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

# **apiMediaRequestsPost**
> apiMediaRequestsPost()


### Example

```typescript
import {
    MediaRequestsApi,
    Configuration,
    MediaRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new MediaRequestsApi(configuration);

let mediaRequest: MediaRequest; // (optional)

const { status, data } = await apiInstance.apiMediaRequestsPost(
    mediaRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **mediaRequest** | **MediaRequest**|  | |


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

