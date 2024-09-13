---
layout:         "ios"
title:          "iOS - Custom Request Params"
lead:           ""
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       ios/custom-request-params/
lang:            "en"
---


# Setup Audio Session {#audio}
---

To fulfill the requirement of 3rd party tracking, Vpon SDK will set the Audio Session Category as `AVAudioSessionCategoryPlayBack / OptionsWithMixWithOthers`. You can reset the Audio Session Category after SDK initialization.

Please follow the guideline below if you don't want Vpon SDK to reset the Audio Session.


### Objective-C

```objc
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {

    // Vpon SDK initialization
    VponAdConfiguration *config = VponAdConfiguration.shared;
    config.logLevel = VponLogLevelDefault;
    // set YES, SDK won't set and activate the audio session
    config.audioManager.isAudioApplicationManaged = YES;
    [config initializeSdk];

    return YES;
}
```

### Switft

```swift
 func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions:      
    [UIApplicationLaunchOptionsKey: Any]?) -> Bool {
    
	// Vpon SDK initialization
	let config = VponAdConfiguration.shared
	config.logLevel = .default
	// set true, SDK won't set and activate the audio session
	config.audioManager.isAudioApplicationManaged = true
	config.initializeSdk()

    return true
}
```

## (Optional) SDK Audio Session Usage
---

We recommend that you should call the functions below to let SDK know that you are taking the control of the Audio Session. 

```objc
// Call this function to let SDK know that you will set and activate a new Audio Session Category
VponAdAudioManager.shared.noticeApplicationAudioWillStart()

// Call this function to let SDK know that your media is finish, SDK will set and activate the Audio Session Category to AVAudioSessionCategoryPlayBack / OptionsWithMixWithOthers
VponAdAudioManager.shared.noticeApplicationAudioDidEnded()
```

>**Note:** `noticeApplicationAudioWillStart` and `noticeApplicationAudioDidEnded` are not compatible with the integration with Mediation.


---
# Custom Ad Request Parameters
---
Add the optional parameters below when setting up VpadnAdRequest to make Vpon deliver more ads precisely.

### Objective-C

```objc
VponAdRequest *request = [[VponAdRequest alloc] init];

// Set user's gender if available
[request setUserInfoGender:VponUserGenderMale];
// Set user's birthday if available
[request setUserInfoBirthdayWithYear:2000 month:8 day:17];

[request addKeyword:@"keywordA"];
[request addKeyword:@"keyword1:value1"];

VponAdRequestConfiguration *config = VponAdRequestConfiguration.shared;

// Set your test device's IDFA here if you're trying to get Vpon test ad
[config setTestDeviceIdentifiers:@[[ASIdentifierManager sharedManager].advertisingIdentifier.UUIDString]];
// To set up if the ads will be displayed only to the specific ages of audience
[config setTagForUnderAgeOfConsent:VponTagForUnderAgeOfConsentNotForUnderAgeOfConsent];
// To set up if the ads will be displayed to childern specific
[config setTagForChildDirectedTreatment:VponTagForChildDirectedTreatmentNotForChildDirectedTreatment];
// To set up the maximum content rating filter
[config setMaxAdContentRating:VponMaxAdContentRatingGeneral];
```

### Swift

```swift
let request = VponAdRequest()

// Set user's gender if available
request.setUserInfoGender(.male)
// Set user's birthday if available
request.setUserInfoBirthday(year: 2000, month: 08, day: 17)
 
request.addKeyword("keywordA")
request.addKeyword("keyword1:value1")

// Set your test device's IDFA here if you're trying to get Vpon test ad
VponAdRequestConfiguration.shared.testDeviceIdentifiers = ([ASIdentifierManager.shared().advertisingIdentifier.uuidString])
// To set up if the ads will be displayed to childern specific
VponAdRequestConfiguration.shared.tagForChildDirectedTreatment = .notForChildDirectedTreatment // 是否專為兒童投放
// To set up if the ads will be displayed only to the specific ages of audience
VponAdRequestConfiguration.shared.tagForUnderAgeOfConsent = .notForUnderAgeOfConsent // 是否專為特定年齡投放
// To set up the maximum content rating filter
VponAdRequestConfiguration.shared.maxAdContentRating = .general
```


# How To Send Content Data To Vpon
---
You can use `setContentUrl` and `setContentData` to send content information to Vpon via SDK.

>**Note:** `setContentUrl` and `setContentData` only available in Vpon SDK v5.1.1 and above.


### Objective-C

```objc
// Set content page url
[request setContentUrl:@"https://www.vpon.com.tw/"];
// Set content page data with an array of key-value
[request setContentData:@{@"key1": @(1), @"key2": @(YES), @"key3": @"name", @"key4": @(123.31)}];
```

### Swift

```swift
// Set content page url
request.setContentUrl("https://www.google.com.tw/")
// Set content page data with an array of key-value
request.setContentData(["key1": 1, "key2": true, "key3": "name", "key4": 123.31]) 
```


# Send Content Data To Vpon Via Mediation
---
Please follow the instruction below to send the content information to Vpon if you are trying to integrate Vpon SDK with below Mediation Platforms:

* [AdMob / Google Ad Manager][5]
* [MoPub][6]

## AdMob / Google Ad Manager {#admob}

Please check your SDK and Adapter version first if you are using AdMob / Google Ad Manager, the SDK and Adapter version must be:

* `Vpon SDK v5.6.0` and above
* `Vpon AdMob Adapter v2.1.0` and above


Please refer to the sample below if you are integrating Banner Ad or Interstitial Ad:

### Objective-C

```objc
GADRequest *request = [GADRequest request];
GADExtras *extra = [[GADExtras alloc] init];
 extra.additionalParameters = @{
    @"contentURL": @"https://www.vpon.com",
    @"contentData": @{@"key1": @"Admob", @"key2": @(1.2), @"key3": @(YES)}
    };
[request registerAdNetworkExtras:extra];
// Set content page url and data with an array of key-value
```

### Swift

```swift
let extra = GADExtras()
extra.additionalParameters = ["contentURL":"https://www.vpon.com", "contentData": ["key1": "Admob", "key2": 1.2, "key3": true]]
request.register(extra)
// Set content page url and data with an array of key-value
```

For Native Ad, please note the Label you set for the custom event and refer to the sample below to integrate the ads:

<img src="{{site.imgurl}}/AdMob_ContentLabel01.PNG" alt=""/>
<!-- <img src="{{site.imgurl}}/AdMob_ContentLabel02.PNG" alt=""/> -->


### Objective-C

```objc
GADRequest *request = [GADRequest request];
GADCustomEventExtras *extra = [[GADCustomEventExtras alloc] init];
[extra setExtras:@{
        @"contentURL": @"https://www.google.com.tw/",
        @"contentData": @{@"key1": @(1), @"key2": @(YES), @"key3": @"name", @"key4": @(123.31)}
        } forLabel:@"vpon"];
[request registerAdNetworkExtras:extra];
// Set content page url and data with an array of key-value
// forLabel string must be the same as the one you set for AdMob / GAM custom event
```

### Swift

```swift
let extra = GADCustomEventExtras()
extra.setExtras(["contentURL":"https://www.vpon.com", "contentData": ["key1": "Admob", "key2": 1.2, "key3": true]], forLabel: "vpon")
request.register(extra)
// Set content page url and data with an array of key-value
// forLabel string must be the same as the one you set for AdMob / GAM custom event
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