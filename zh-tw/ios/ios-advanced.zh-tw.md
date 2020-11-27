---
layout: "ios"
title: "iOS - 進階設定"
lead: "幫助您取得更多廣告功能"
description:
keywords: 'Keywords for this page, in the meta data'
permalink: /zh-tw/ios/advanced/
lang: "zh-tw"
---

# 設定 Audio Session {#audio}
---

為配合第三方追蹤要求，Vpon SDK 會在初始化時，將 App 的 Audio Session Category 設為 `AVAudioSessionCategoryPlayBack / OptionsWithMixWithOthers` (當有音樂要播放時，App 將以混音形式播放音樂，且不會受實體靜音鍵的影響)。您可以在 SDK 初始化後，重新指定及啟用其它 Audio Session Category。

如果您不希望 Vpon SDK 更動 Audio Session，請在初始化時，加入以下程式片段。

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

在 Vpon SDK 設置並啟用 Audio Session 後，如果您需要再重新指定並啟用 Audio Session Category，我們建議您在重新指定 Audio Session Category 及結束影音播放時，呼叫以下 Function，讓 SDK 知道您是否正在控制 Audio Session。

```objc
- (void) noticeApplicationAudioWillStart;
// Call this function to let SDK know that you will set and activate a new Audio Session Category

- (void) noticeApplicationAudioDidEnded;
// Call this function to let SDK know that your media is finish, SDK will set and activate the Audio Session Category to AVAudioSessionCategoryPlayBack / OptionsWithMixWithOthers
```

>**Note:** 以上方法不適用於透過 Mediation 串接 Vpon SDK 者。


# 自定義廣告請求參數
---
您可以在建立廣告請求時，選擇性地加入以下自定義的參數，讓 Vpon 可以用更精準的方式投放廣告

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

# 回傳內容資訊
---
您可以透過 `setContentUrl` 及 `setContentData` 將頁面內容資訊透過 SDK 發給 Vpon

>**Note:** 此功能適用於 `Vpon SDK v5.1.1` 及以上版本


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



<!-- >**Note:** 關於自定義參數值的參考值，請參考以下說明 -->

<!-- 需要以下參數的 defination -->
<!-- 
## MaxAdContentRating

|Constant|Description|
|:-------|:---------|
|MAX_AD_CONTENT_RATING_G||
|MAX_AD_CONTENT_RATING_PG||
|MAX_AD_CONTENT_RATING_T||
|MAX_AD_CONTENT_RATING_MA||
|MAX_AD_CONTENT_RATING_UNSPECIFIED|Default value|

## TagForUnderAgeOfConsent

|Constant|Description|
|:-------|:---------|
|TAG_FOR_UNDER_AGE_OF_CONSENT_TRUE||
|TAG_FOR_UNDER_AGE_OF_CONSENT_FALSE|
|TAG_FOR_UNDER_AGE_OF_CONSENT_UNSPECIFIED|Default value|

## TagForChildDirectedTreatment

|Constant|Description|
|:-------|:---------|
|TAG_FOR_CHILD_DIRECTED_TREATMENT_TRUE||
|TAG_FOR_CHILD_DIRECTED_TREATMENT_FALSE||
|TAG_FOR_CHILD_DIRECTED_TREATMENT_UNSPECIFIED|Default value| -->




[CrazyadSetting]: {{site.imgurl}}/CrazyadSetting.png
[註冊帳號]: {{ site.baseurl }}/zh-tw/ios/registration/
[開發商後台]: http://console.vpon.com
[Vpon Web SDK 串接說明]: {{site.baseurl}}/zh-tw/web/
[Corona Document]: http://docs.coronalabs.com/api/library/native/newWebView.html