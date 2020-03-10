---
layout:         "android"
title:          "Android - 進階設定"
lead:           "幫助您取得更多廣告功能與資料收集"
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       /zh-tw/android/advanced/
lang:            "zh-tw"
---

# 自定義廣告請求參數
---
您可以在建立廣告請求時，選擇性地加入以下自定義的參數，讓 Vpon 可以用更精準的方式投放廣告

```java
VponAdRequest.Builder builder = new VponAdRequest.Builder();

builder.setAutoRefresh(boolean);
// Only available for Banner Ad, will auto refresh ad if set true
builder.addTestDevice(String);
// Set your test device's GAID here if you're trying to get Vpon test ad

builder.setGender(VponAdRequest.Gender.UNSPECIFIED);
// Set user's gender if available
builder.setBirthday(Date);
// Set user's birthday if available
builder.setLocation(Location);
// Set user's location if available

builder.setMaxAdContentRating(String);
// To set up the maximum content rating filter
builder.setTagForUnderAgeOfConsent(-1);
// To set up if the ads will be displayed only to the specific ages of audience
builder.tagForChildDirectedTreatment(-1);
// To set up if the ads will be displayed to childern specific

builder.addKeyword(String);
builder.addKeywords(Set<String>);
```

>**Note:** 關於自定義參數值的參考值，請參考以下說明


## MaxAdContentRating

|Constant|Description|
|:------|:---------|
|T| For teenager|
|PG| For parent guardian|
|MA| For mature adult|
|G| For general, any one, include child age under|

## TagForUnderAgeOfConsent

|Constant|Description|
|:------|:---------|
|1|TAG_FOR_UNDER_AGE_OF_CONSENT_TRUE|
|0|TAG_FOR_UNDER_AGE_OF_CONSENT_FALSE|
|-1|(Default Value)<br>TAG_FOR_UNDER_AGE_OF_CONSENT_UNSPECIFIED|

## TagForChildDirectedTreatment

|Constant|Description|
|:------|:---------|
|1|TAG_FOR_CHILD_DIRECTED_TREATMENT_TRUE|
|0|TAG_FOR_CHILD_DIRECTED_TREATMENT_FALSE|
|-1|(Default Value)<br>TAG_FOR_CHILD_DIRECTED_TREATMENT_UNSPECIFIED|



<!-- # Corona User
---
如果您的 App 使用 Corona 欲串接 Vpon 廣告，我們建議您用 Web SDK 的方式串接，使用方法如下：

1. 請參考 [Vpon Web SDK 串接說明]，準備一個包含 Web SDK 廣告請求的 HTML 檔案
2. 在 WebView 中讀取該 HTML 檔案，例如：webView:request(“localfile.html”, system.ResourceDirectory)

> **Note**：更多 Corona SDK 文件可參考: [Corona Document]
 -->


[CrazyadSetting]: {{site.imgurl}}/CrazyadSetting.png
[註冊帳號]: {{ site.baseurl }}/zh-tw/android/registration/
[開發商後台]: http://console.vpon.com
[Vpon Web SDK 串接說明]: {{site.baseurl}}/zh-tw/web/
[Corona Document]: http://docs.coronalabs.com/api/library/native/newWebView.html
