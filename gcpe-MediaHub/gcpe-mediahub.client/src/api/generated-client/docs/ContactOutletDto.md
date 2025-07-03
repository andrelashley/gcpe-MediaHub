# ContactOutletDto


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**outletName** | **string** |  | [optional] [default to undefined]
**outletId** | **string** |  | [optional] [default to undefined]
**outletEmail** | **string** |  | [optional] [default to undefined]
**contactEmails** | **Array&lt;string&gt;** |  | [optional] [default to undefined]
**contactPhones** | [**Array&lt;MediaContactPhoneDto&gt;**](MediaContactPhoneDto.md) |  | [optional] [default to undefined]
**isMajorMedia** | **boolean** |  | [optional] [default to undefined]

## Example

```typescript
import { ContactOutletDto } from './api';

const instance: ContactOutletDto = {
    outletName,
    outletId,
    outletEmail,
    contactEmails,
    contactPhones,
    isMajorMedia,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
