---
layout: "ios"
title: "iOS - 进阶设定"
lead: "帮助您取得更多广告功能与资料收集"
description:
keywords: 'Keywords for this page, in the meta data'
permalink: /zh-cn/ios/advanced/
lang: "zh-cn"
---

# 自定义广告请求参数
---
您可以在建立广告请求时，选择项地加入以下自定义的参数，让 Vpon 可以用更精准的方式投放广告

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
[注册帐号]: {{ site.baseurl }}/zh-cn/ios/registration/
[开发商后台]: http://console.vpon.com
[Vpon Web SDK 串接说明]: {{site.baseurl}}/zh-cn/web/
[Corona Document]: http://docs.coronalabs.com/api/library/native/newWebView.html