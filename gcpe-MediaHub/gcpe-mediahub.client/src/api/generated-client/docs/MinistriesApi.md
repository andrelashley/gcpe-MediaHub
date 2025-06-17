# MinistriesApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**apiMinistriesGet**](#apiministriesget) | **GET** /api/Ministries | |

# **apiMinistriesGet**
> Array<Ministry> apiMinistriesGet()


### Example

```typescript
import {
    MinistriesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new MinistriesApi(configuration);

const { status, data } = await apiInstance.apiMinistriesGet();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<Ministry>**

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

