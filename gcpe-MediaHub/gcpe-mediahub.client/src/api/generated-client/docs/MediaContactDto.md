# MediaContactDto


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** |  | [optional] [default to undefined]
**firstName** | **string** |  | [optional] [default to undefined]
**lastName** | **string** |  | [optional] [default to undefined]
**email** | **string** |  | [optional] [default to undefined]
**isActive** | **boolean** |  | [optional] [default to undefined]
**jobTitle** | **string** |  | [optional] [default to undefined]
**isPressGallery** | **boolean** |  | [optional] [default to undefined]
**personalWebsite** | **string** |  | [optional] [default to undefined]
**mediaOutletContactRelationships** | [**Array&lt;ContactOutletDto&gt;**](ContactOutletDto.md) |  | [optional] [default to undefined]
**requests** | [**Array&lt;MediaRequestDto&gt;**](MediaRequestDto.md) |  | [optional] [default to undefined]
**socialMedias** | [**Array&lt;SocialMediaDto&gt;**](SocialMediaDto.md) |  | [optional] [default to undefined]

## Example

```typescript
import { MediaContactDto } from './api';

const instance: MediaContactDto = {
    id,
    firstName,
    lastName,
    email,
    isActive,
    jobTitle,
    isPressGallery,
    personalWebsite,
    mediaOutletContactRelationships,
    requests,
    socialMedias,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
