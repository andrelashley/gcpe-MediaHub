# ContactDto


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** |  | [optional] [default to undefined]
**firstName** | **string** |  | [optional] [default to undefined]
**lastName** | **string** |  | [optional] [default to undefined]
**email** | **string** |  | [optional] [default to undefined]
**isActive** | **boolean** |  | [optional] [default to undefined]
**jobTitle** | **string** |  | [optional] [default to undefined]
**outlets** | [**Array&lt;ContactOutletDto&gt;**](ContactOutletDto.md) |  | [optional] [default to undefined]
**requests** | [**Array&lt;MediaRequestDto&gt;**](MediaRequestDto.md) |  | [optional] [default to undefined]

## Example

```typescript
import { ContactDto } from './api';

const instance: ContactDto = {
    id,
    firstName,
    lastName,
    email,
    isActive,
    jobTitle,
    outlets,
    requests,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
