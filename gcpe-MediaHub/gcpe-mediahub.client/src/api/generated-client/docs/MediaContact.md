# MediaContact


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** |  | [optional] [default to undefined]
**firstName** | **string** |  | [default to undefined]
**lastName** | **string** |  | [default to undefined]
**isPressGallery** | **boolean** |  | [optional] [default to undefined]
**personalWebsite** | **string** |  | [optional] [default to undefined]
**isActive** | **boolean** |  | [optional] [default to undefined]
**email** | **string** |  | [default to undefined]
**jobTitleId** | **number** |  | [default to undefined]
**jobTitle** | [**JobTitle**](JobTitle.md) |  | [optional] [default to undefined]
**mediaOutletContactRelationships** | [**Array&lt;MediaOutletContactRelationship&gt;**](MediaOutletContactRelationship.md) |  | [optional] [default to undefined]
**mediaRequests** | [**Array&lt;MediaRequest&gt;**](MediaRequest.md) |  | [optional] [default to undefined]
**socialMedias** | [**Array&lt;SocialMedia&gt;**](SocialMedia.md) |  | [optional] [default to undefined]
**location** | **string** |  | [optional] [default to undefined]

## Example

```typescript
import { MediaContact } from './api';

const instance: MediaContact = {
    id,
    firstName,
    lastName,
    isPressGallery,
    personalWebsite,
    isActive,
    email,
    jobTitleId,
    jobTitle,
    mediaOutletContactRelationships,
    mediaRequests,
    socialMedias,
    location,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
