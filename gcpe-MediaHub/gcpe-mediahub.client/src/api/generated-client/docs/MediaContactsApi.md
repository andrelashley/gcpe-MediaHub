# MediaContactsApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**apiMediaContactsGet**](#apimediacontactsget) | **GET** /api/MediaContacts | |
|[**apiMediaContactsGetJobTitlesGet**](#apimediacontactsgetjobtitlesget) | **GET** /api/MediaContacts/GetJobTitles | |
|[**apiMediaContactsGetSocialMediasGet**](#apimediacontactsgetsocialmediasget) | **GET** /api/MediaContacts/GetSocialMedias | |
|[**apiMediaContactsIdDelete**](#apimediacontactsiddelete) | **DELETE** /api/MediaContacts/{id} | |
|[**apiMediaContactsIdGet**](#apimediacontactsidget) | **GET** /api/MediaContacts/{id} | |
|[**apiMediaContactsIdPut**](#apimediacontactsidput) | **PUT** /api/MediaContacts/{id} | |
|[**apiMediaContactsPost**](#apimediacontactspost) | **POST** /api/MediaContacts | |
|[**apiMediaContactsSearchFullNameGet**](#apimediacontactssearchfullnameget) | **GET** /api/MediaContacts/search/{fullName} | |

# **apiMediaContactsGet**
> Array<MediaContactDto> apiMediaContactsGet()


### Example

```typescript
import {
    MediaContactsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new MediaContactsApi(configuration);

const { status, data } = await apiInstance.apiMediaContactsGet();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<MediaContactDto>**

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

# **apiMediaContactsGetJobTitlesGet**
> Array<JobTitle> apiMediaContactsGetJobTitlesGet()


### Example

```typescript
import {
    MediaContactsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new MediaContactsApi(configuration);

const { status, data } = await apiInstance.apiMediaContactsGetJobTitlesGet();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<JobTitle>**

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

# **apiMediaContactsGetSocialMediasGet**
> Array<SocialMediaCompanyDto> apiMediaContactsGetSocialMediasGet()


### Example

```typescript
import {
    MediaContactsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new MediaContactsApi(configuration);

const { status, data } = await apiInstance.apiMediaContactsGetSocialMediasGet();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<SocialMediaCompanyDto>**

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

# **apiMediaContactsIdDelete**
> apiMediaContactsIdDelete()


### Example

```typescript
import {
    MediaContactsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new MediaContactsApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.apiMediaContactsIdDelete(
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

# **apiMediaContactsIdGet**
> MediaContact apiMediaContactsIdGet()


### Example

```typescript
import {
    MediaContactsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new MediaContactsApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.apiMediaContactsIdGet(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


### Return type

**MediaContact**

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

# **apiMediaContactsIdPut**
> apiMediaContactsIdPut()


### Example

```typescript
import {
    MediaContactsApi,
    Configuration,
    MediaContact
} from './api';

const configuration = new Configuration();
const apiInstance = new MediaContactsApi(configuration);

let id: string; // (default to undefined)
let mediaContact: MediaContact; // (optional)

const { status, data } = await apiInstance.apiMediaContactsIdPut(
    id,
    mediaContact
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **mediaContact** | **MediaContact**|  | |
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

# **apiMediaContactsPost**
> MediaContact apiMediaContactsPost()


### Example

```typescript
import {
    MediaContactsApi,
    Configuration,
    MediaContactDto
} from './api';

const configuration = new Configuration();
const apiInstance = new MediaContactsApi(configuration);

let mediaContactDto: MediaContactDto; // (optional)

const { status, data } = await apiInstance.apiMediaContactsPost(
    mediaContactDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **mediaContactDto** | **MediaContactDto**|  | |


### Return type

**MediaContact**

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

# **apiMediaContactsSearchFullNameGet**
> MediaContact apiMediaContactsSearchFullNameGet()


### Example

```typescript
import {
    MediaContactsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new MediaContactsApi(configuration);

let fullName: string; // (default to undefined)

const { status, data } = await apiInstance.apiMediaContactsSearchFullNameGet(
    fullName
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **fullName** | [**string**] |  | defaults to undefined|


### Return type

**MediaContact**

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

