---
layout:         "ios"
title:          "iOS - Advanced Setting"
lead:           ""
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       ios/advanced/
lang:            "en"
---

# Set Up Audio Session {#audio}
---
To comply with 3rd-party tracking vendors' requirement, Vpon SDK will set the Audio Session Category of the App as `AVAudioSessionCategoryPlayBack / OptionsWithMixWithOthers` (The audio play in the app will be mixable, and the audio playing won't be impacted by the Ring/Silent swtich on iPhone). You can reassign and activate the Audio Session Category after SDK initilization.


To ask SDK not to change the audio session category, please follow the instruction below.

## Objective-C

```objc
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {

    // Vpon SDK initialization
    VpadnAdConfiguration *config = [VpadnAdConfiguration sharedInstance];
    config.logLevel = VpadnLogLevelDefault;
    config.audioManager.isAudioApplicationManaged = YES;
    // set YES, SDK won't set and activate the audio session
    [config initializeSdk];

    return YES;
}
```

## Switft

```swift
 func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions:      
    [UIApplicationLaunchOptionsKey: Any]?) -> Bool {

        // Vpon SDK initialization
        let config = VpadnAdConfiguration.sharedInstance()
        config.logLevel = .default
        config.audioManager.isAudioApplicationManaged = true
        // set true, SDK won't set and activate the audio session
        config.initializeSdk()

        return true
    }
```

After Vpon SDK set and activate the Audio Session, we recommend that you should call the functions below to let SDK know that you are taking the control of the Audio Session. 

```objc
- (void) noticeApplicationAudioWillStart;
// Call this function to let SDK know that you will set and activate a new Audio Session Category

- (void) noticeApplicationAudioDidEnded;
// Call this function to let SDK know that your media is finish, SDK will set and activate the Audio Session Category to AVAudioSessionCategoryPlayBack / OptionsWithMixWithOthers
```

>**Note:** These functions are only compatible with the integration without Mediation.



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


# How To Send Content Data To Vpon
---
You can use `setContentUrl` and `setContentData` to send content information to Vpon via SDK.

>**Note:** `setContentUrl` and `setContentData` only available in Vpon SDK v5.1.1 and above.


### Objective-C

```objc
[request setContentUrl:@"https://www.vpon.com.tw/"];
// Set content page url
[request setContentData:@{@"key1": @(1), @"key2": @(YES), @"key3": @"name", @"key4": @(123.31)}];
// Set content page data with an array of key-value
```

### Swift

```swift
request.setContentUrl("https://www.google.com.tw/")
// Set content page url
request.setContentData(["key1": 1, "key2": true, "key3": "name", "key4": 123.31]) 
// Set content page data with an array of key-value
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