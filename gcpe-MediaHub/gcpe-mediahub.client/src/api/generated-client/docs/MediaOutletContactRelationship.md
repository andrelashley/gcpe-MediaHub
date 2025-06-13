# MediaOutletContactRelationship


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** |  | [optional] [default to undefined]
**mediaOutletId** | **string** |  | [optional] [default to undefined]
**mediaOutlet** | [**MediaOutlet**](MediaOutlet.md) |  | [optional] [default to undefined]
**mediaContactId** | **string** |  | [optional] [default to undefined]
**mediaContact** | [**MediaContact**](MediaContact.md) |  | [optional] [default to undefined]
**title** | **string** |  | [optional] [default to undefined]
**startDate** | **string** |  | [optional] [default to undefined]
**endDate** | **string** |  | [optional] [default to undefined]
**emails** | [**Array&lt;MediaContactEmail&gt;**](MediaContactEmail.md) |  | [optional] [default to undefined]
**phoneNumbers** | [**Array&lt;MediaContactPhone&gt;**](MediaContactPhone.md) |  | [optional] [default to undefined]

## Example

```typescript
import { MediaOutletContactRelationship } from './api';

const instance: MediaOutletContactRelationship = {
    id,
    mediaOutletId,
    mediaOutlet,
    mediaContactId,
    mediaContact,
    title,
    startDate,
    endDate,
    emails,
    phoneNumbers,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
