# RequestTypesApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**apiRequestTypesGet**](#apirequesttypesget) | **GET** /api/RequestTypes | |

# **apiRequestTypesGet**
> Array<RequestType> apiRequestTypesGet()


### Example

```typescript
import {
    RequestTypesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new RequestTypesApi(configuration);

const { status, data } = await apiInstance.apiRequestTypesGet();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<RequestType>**

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

