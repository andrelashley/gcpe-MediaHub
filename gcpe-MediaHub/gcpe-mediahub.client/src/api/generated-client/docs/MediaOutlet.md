# MediaOutlet


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** |  | [optional] [default to undefined]
**outletName** | **string** |  | [default to undefined]
**isMajorMedia** | **boolean** |  | [optional] [default to undefined]
**email** | **string** |  | [default to undefined]
**website** | **string** |  | [optional] [default to undefined]
**parentOutletId** | **string** |  | [optional] [default to undefined]
**parentOutlet** | [**MediaOutlet**](MediaOutlet.md) |  | [optional] [default to undefined]
**childOutlets** | [**Array&lt;MediaOutlet&gt;**](MediaOutlet.md) |  | [optional] [default to undefined]
**phoneNumber** | [**PhoneNumber**](PhoneNumber.md) |  | [optional] [default to undefined]
**addresses** | [**Array&lt;Address&gt;**](Address.md) |  | [optional] [default to undefined]
**mediaTypes** | [**Array&lt;MediaType&gt;**](MediaType.md) |  | [optional] [default to undefined]
**writtenLanguages** | [**Array&lt;WrittenLanguage&gt;**](WrittenLanguage.md) |  | [optional] [default to undefined]
**socialMedias** | [**Array&lt;SocialMedia&gt;**](SocialMedia.md) |  | [optional] [default to undefined]
**mediaOutletPhoneNumbers** | [**Array&lt;MediaOutletPhoneNumber&gt;**](MediaOutletPhoneNumber.md) |  | [optional] [default to undefined]
**mediaRequests** | [**Array&lt;MediaRequest&gt;**](MediaRequest.md) |  | [optional] [default to undefined]

## Example

```typescript
import { MediaOutlet } from './api';

const instance: MediaOutlet = {
    id,
    outletName,
    isMajorMedia,
    email,
    website,
    parentOutletId,
    parentOutlet,
    childOutlets,
    phoneNumber,
    addresses,
    mediaTypes,
    writtenLanguages,
    socialMedias,
    mediaOutletPhoneNumbers,
    mediaRequests,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
