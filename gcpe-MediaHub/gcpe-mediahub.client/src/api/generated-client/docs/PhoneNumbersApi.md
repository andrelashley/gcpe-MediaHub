# PhoneNumbersApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**apiPhoneNumbersGet**](#apiphonenumbersget) | **GET** /api/PhoneNumbers | |
|[**apiPhoneNumbersIdDelete**](#apiphonenumbersiddelete) | **DELETE** /api/PhoneNumbers/{id} | |
|[**apiPhoneNumbersIdGet**](#apiphonenumbersidget) | **GET** /api/PhoneNumbers/{id} | |
|[**apiPhoneNumbersIdPut**](#apiphonenumbersidput) | **PUT** /api/PhoneNumbers/{id} | |
|[**apiPhoneNumbersPost**](#apiphonenumberspost) | **POST** /api/PhoneNumbers | |

# **apiPhoneNumbersGet**
> Array<PhoneNumber> apiPhoneNumbersGet()


### Example

```typescript
import {
    PhoneNumbersApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PhoneNumbersApi(configuration);

const { status, data } = await apiInstance.apiPhoneNumbersGet();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<PhoneNumber>**

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

# **apiPhoneNumbersIdDelete**
> apiPhoneNumbersIdDelete()


### Example

```typescript
import {
    PhoneNumbersApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PhoneNumbersApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.apiPhoneNumbersIdDelete(
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

# **apiPhoneNumbersIdGet**
> PhoneNumber apiPhoneNumbersIdGet()


### Example

```typescript
import {
    PhoneNumbersApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PhoneNumbersApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.apiPhoneNumbersIdGet(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


### Return type

**PhoneNumber**

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

# **apiPhoneNumbersIdPut**
> apiPhoneNumbersIdPut()


### Example

```typescript
import {
    PhoneNumbersApi,
    Configuration,
    PhoneNumber
} from './api';

const configuration = new Configuration();
const apiInstance = new PhoneNumbersApi(configuration);

let id: string; // (default to undefined)
let phoneNumber: PhoneNumber; // (optional)

const { status, data } = await apiInstance.apiPhoneNumbersIdPut(
    id,
    phoneNumber
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **phoneNumber** | **PhoneNumber**|  | |
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

# **apiPhoneNumbersPost**
> PhoneNumber apiPhoneNumbersPost()


### Example

```typescript
import {
    PhoneNumbersApi,
    Configuration,
    PhoneNumber
} from './api';

const configuration = new Configuration();
const apiInstance = new PhoneNumbersApi(configuration);

let phoneNumber: PhoneNumber; // (optional)

const { status, data } = await apiInstance.apiPhoneNumbersPost(
    phoneNumber
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **phoneNumber** | **PhoneNumber**|  | |


### Return type

**PhoneNumber**

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

