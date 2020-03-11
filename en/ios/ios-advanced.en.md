---
layout:         "ios"
title:          "iOS - Advanced Setting"
lead:           ""
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       ios/advanced/
lang:            "en"

---
# Custom Ad Request Parameters
---
Add the optional parameters below when setting up VpadnAdRequest to make Vpon deliver more ads precisely.

### Objective-C

```objc
VpadnAdRequest *request = [[VpadnAdRequest alloc] init];

[request setAutoRefresh:YES];
// Only available for Banner Ad, will auto refresh ad if set YES
[request setTestDevices:@[[ASIdentifierManager sharedManager].advertisingIdentifier.UUIDString]];
// Set your test device's IDFA here if you're trying to get Vpon test ad

[request setUserInfoGender:VpadnGenderUnspecified];
// Set user's gender if available
[request setUserInfoBirthdayWithYear:2000 Month:1 andDay:1];
// Set user's birthday if available

[request setMaxAdContentRating:VpadnMaxAdContentRatingUnspecified];
// To set up the maximum content rating filter
[request setTagForUnderAgeOfConsent:VpadnTagForUnderAgeOfConsentUnspecified];
// To set up if the ads will be displayed only to the specific ages of audience
[request setTagForChildDirectedTreatment:VpadnTagForChildDirectedTreatmentUnspecified];
// To set up if the ads will be displayed to childern specific

[request addKeyword:@"keywordA"];
[request addKeyword:@"keyword1:value1"];
```

### Swift

```swift
let request = VpadnAdRequest.init()

request.setAutoRefresh(true)
// Only available for Banner Ad, will auto refresh ad if set true
request.setTestDevices([ASIdentifierManager.shared().advertisingIdentifier.uuidString])
// Set your test device's IDFA here if you're trying to get Vpon test ad

request.setUserInfoGender(.genderUnspecified)
// Set user's gender if available
request.setUserInfoBirthdayWithYear(2000, month: 01, andDay: 01)
// Set user's birthday if available

request.setMaxAdContentRating(.general)
// To set up the maximum content rating filter
request.setTagForUnderAgeOfConsent(.false)
// To set up if the ads will be displayed only to the specific ages of audience
request.setTagForChildDirectedTreatment(.false)
// To set up if the ads will be displayed to childern specific

request.addKeyword("keywordA")
request.addKeyword("keyword1:value1")
```

<!-- >**Note:** Please refer to the reference below for the description of specific custom parameters -->

<!-- 需要以下參數的 defination -->
<!-- 
## MaxAdContentRating

|Constant|Description|
|:------|:---------|
|MAX_AD_CONTENT_RATING_G||
|MAX_AD_CONTENT_RATING_PG||
|MAX_AD_CONTENT_RATING_T||
|MAX_AD_CONTENT_RATING_MA||
|MAX_AD_CONTENT_RATING_UNSPECIFIED|Default value|

## TagForUnderAgeOfConsent

|Constant|Description|
|:------|:---------|
|TAG_FOR_UNDER_AGE_OF_CONSENT_TRUE||
|TAG_FOR_UNDER_AGE_OF_CONSENT_FALSE|
|TAG_FOR_UNDER_AGE_OF_CONSENT_UNSPECIFIED|Default value|

## TagForChildDirectedTreatment

|Constant|Description|
|:------|:---------|
|TAG_FOR_CHILD_DIRECTED_TREATMENT_TRUE||
|TAG_FOR_CHILD_DIRECTED_TREATMENT_FALSE||
|TAG_FOR_CHILD_DIRECTED_TREATMENT_UNSPECIFIED|Default value| -->

<!-- # Corona User
---
1. Please refer to [Vpon Web SDK Integration Guide]({{site.baseurl}}/web/) to prepare a HTML file with ad request
2. Load the HTML file in WebView, for example, webView:request("localfile.html", system.ResourceDirectory)

> **Note:** To know more about Corona, please refer to [Corona Document](http://docs.coronalabs.com/api/library/native/newWebView.html) -->

[Register as a Vpon Publisher]: {{ site.baseurl }}/ios/registration/