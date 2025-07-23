# MediaRequestDto


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** |  | [optional] [default to undefined]
**title** | **string** |  | [optional] [default to undefined]
**receivedOn** | **string** |  | [optional] [default to undefined]
**deadline** | **string** |  | [optional] [default to undefined]
**leadMinistry** | [**Ministry**](Ministry.md) |  | [optional] [default to undefined]
**statusId** | **number** |  | [optional] [default to undefined]
**statusName** | **string** |  | [optional] [default to undefined]
**requestNo** | **number** |  | [optional] [default to undefined]
**additionalMinistries** | [**Array&lt;Ministry&gt;**](Ministry.md) |  | [optional] [default to undefined]

## Example

```typescript
import { MediaRequestDto } from './api';

const instance: MediaRequestDto = {
    id,
    title,
    receivedOn,
    deadline,
    leadMinistry,
    statusId,
    statusName,
    requestNo,
    additionalMinistries,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
