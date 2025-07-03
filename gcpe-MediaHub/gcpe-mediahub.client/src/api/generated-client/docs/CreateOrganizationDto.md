# CreateOrganizationDto


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**outletName** | **string** |  | [default to undefined]
**organizationType** | **string** |  | [default to undefined]
**isMajorMedia** | **boolean** |  | [optional] [default to undefined]
**parentOutletId** | **string** |  | [optional] [default to undefined]
**email** | **string** |  | [optional] [default to undefined]
**website** | **string** |  | [optional] [default to undefined]
**mediaTypeIds** | **Array&lt;number&gt;** |  | [optional] [default to undefined]
**writtenLanguageIds** | **Array&lt;number&gt;** |  | [optional] [default to undefined]
**phoneNumbers** | [**Array&lt;PhoneNumberDto2&gt;**](PhoneNumberDto2.md) |  | [optional] [default to undefined]
**socialMediaLinks** | [**Array&lt;SocialMediaLinkDto&gt;**](SocialMediaLinkDto.md) |  | [optional] [default to undefined]
**address** | [**AddressDto**](AddressDto.md) |  | [optional] [default to undefined]

## Example

```typescript
import { CreateOrganizationDto } from './api';

const instance: CreateOrganizationDto = {
    outletName,
    organizationType,
    isMajorMedia,
    parentOutletId,
    email,
    website,
    mediaTypeIds,
    writtenLanguageIds,
    phoneNumbers,
    socialMediaLinks,
    address,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
