---
layout: "ios"
title: "iOS - 自定义广告请求参数"
lead: "帮助您取得更多广告功能"
description:
keywords: 'Keywords for this page, in the meta data'
permalink: /zh-cn/ios/custom-request-params/
lang: "zh-cn"
---

# 设定 Audio Session {#audio}
---

为配合第三方追踪要求，Vpon SDK 会在初始化时，将 App 的Audio Session Category 设为`AVAudioSessionCategoryPlayBack / OptionsWithMixWithOthers` (当有音乐要播放时，App 将以混音形式播放音乐，且不会受实体静音键的影响)。您可以在SDK初始化后，重新指定及启用其他 Audio Session Category。

如果您不希望 Vpon SDK 更动 Audio Session，请在初始化时，加入以下程式片段。

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

## (Optional) 通知 SDK Audio Session 使用状况
---

我们建议您在重新指定 Audio Session Category 及结束影音播放时，呼叫以下 Function，让 SDK 知道您是否正在控制 Audio Session 。

```objc
// Call this function to let SDK know that you will set and activate a new Audio Session Category
VponAdAudioManager.shared.noticeApplicationAudioWillStart()

// Call this function to let SDK know that your media is finish, SDK will set and activate the Audio Session Category to AVAudioSessionCategoryPlayBack / OptionsWithMixWithOthers
VponAdAudioManager.shared.noticeApplicationAudioDidEnded()
```

>**Note:** noticeApplicationAudioWillStart 及 noticeApplicationAudioDidEnded 不适用于透过 Mediation 串接 Vpon SDK 者。


# 自定义广告请求参数 {#custReq}
---
您可以在建立广告请求时，选择项地加入以下自定义的参数，让 Vpon 可以用更精准的方式投放广告

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

# 回传内容资讯
---
您可以透过 `setContentUrl` 及 `setContentData` 将页面内容资讯透过 SDK 发给 Vpon

>**Note:** 此功能适用于 `Vpon SDK v5.1.1` 及以上版本


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

# 透过 Mediation 回传内容资讯
---
如果您是使用 Mediation 的方式来串接 Vpon SDK，您可以透过以下方式，将页面内容资讯发给 Vpon：

* [AdMob / Google Ad Manager][5]
* [MoPub][6]

## AdMob / Google Ad Manager {#admob}

若您是使用 AdMob / Google Ad Manager 来进行 Mediation，请确认您所使用的 SDK 及 Adapter 版本：

* `Vpon SDK v5.6.0` 及以上版本
* `Vpon AdMob Adapter v2.1.0` 及以上版本


若您串接的是横幅广告或插页广告，请参考以下范例：

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

若您串接的是原生广告，请留意在您设定自订事件时所设置的 Label，并参考以下范例传入对应资料：

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
extra.setExtras(["contentURL":"https://www.vpon.com", "contentData": ["key1": "Admob", "key2": 1.2, "key3": true]], forLabel: "Vpon")
request.register(extra)
// Set content page url and data with an array of key-value
// forLabel string must be the same as the one you set for AdMob / GAM custom event
```

<!-- 
>**Note:** 关于自定义参数值的定义，请参考以下说明


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
|TAG_FOR_CHILD_DIRECTED_TREATMENT_UNSPECIFIED|Default value|
 -->

<!-- # Corona User
---
如果您的 App 使用 Corona 欲串接 Vpon 广告，我们建议您用 Web SDK 的方式串接，使用方法如下：

1. 请参考 [Vpon Web SDK 串接说明]，准备一个包含 Web SDK 广告请求的 HTML 档案
2. 在 WebView 中读取该 HTML 档案，例如：webView:request(“localfile.html”, system.ResourceDirectory)

> **Note**：更多 Corona SDK 文件可参考: [Corona Document] -->

[CrazyadSetting]: {{site.imgurl}}/CrazyadSetting.png
[注册帐号]: {{ site.baseurl }}/zh-cn/ios/registration/
[开发商后台]: http://console.vpon.com
[Vpon Web SDK 串接说明]: {{site.baseurl}}/zh-cn/web/
[Corona Document]: http://docs.coronalabs.com/api/library/native/newWebView.html
