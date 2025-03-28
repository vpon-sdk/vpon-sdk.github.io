---
layout:         "android"
title:          "Android - 自定义广告请求参数"
lead:           "帮助您取得更多广告功能与资料收集"
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       /zh-cn/android/custom-request-params/
lang:            "zh-cn"
---
# 自定义广告请求参数
---
您可以在建立广告请求时，选择项地加入以下自定义的参数，让 Vpon 可以用更精准的方式投放广告

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

# 回传内容资讯
---
您可以透过 `setContentUrl` 及 `setContentData` 将页面内容资讯透过 SDK 发给 Vpon

>**Note:** 此功能适用于 `Vpon SDK v5.1.1` 及以上版本


```java
VponAdRequest.Builder builder = new VponAdRequest.Builder();

HashMap<String, Object> contentData = new HashMap<>();
contentData.put("key1", "Vpon");
contentData.put("key2", 1.2);
contentData.put("key3", true);

builder.setContentData(contentData);
builder.setContentUrl("https://www.vpon.com/zh-hant/");
```

# 透过 Mediation 回传内容资讯
---
如果您是使用 Mediation 的方式来串接 Vpon SDK，您可以透过以下方式，将页面内容资讯发给 Vpon：

* [AdMob / Google Ad Manager][5]
* [MoPub][6]

## AdMob / Google Ad Manager {#admob}

若您是使用 AdMob / Google Ad Manager 来进行 Mediation，请确认您所使用的 SDK 及 Adapter 版本：

* `Vpon SDK v5.1.1` 及以上版本
* `Vpon AdMob Adapter v2.0.1` 及以上版本

若您串接的是横幅广告或插页广告，请参考以下范例：

```java
AdRequest.Builder builder = new AdRequest.Builder();
Bundle bundle = new Bundle();

HashMap<String, Object> contentData = new HashMap<>();
contentData.put("key1", "Vpon");
contentData.put("key2", 1.2);
contentData.put("key3", true);
bundle.putSerializable(AD_CONTENT_DATA, contentData);
bundle.putSerializable(AD_CONTENT_URL, "https://www.vpon.com/zh-hant/");
builder.addNetworkExtrasBundle(VpadnAdapter.class, bundle);

adLoader.loadAd(builder.build());
```

若您串接的是原生广告，请参考以下范例：

```java
AdRequest.Builder builder = new AdRequest.Builder();
Bundle bundle = new Bundle();

HashMap<String, Object> contentData = new HashMap<>();
contentData.put("key1", "Vpon");
contentData.put("key2", 1.2);
contentData.put("key3", true);
bundle.putSerializable(AD_CONTENT_DATA, contentData);
bundle.putSerializable(AD_CONTENT_URL, "https://www.vpon.com/zh-hant/");
builder.addNetworkExtrasBundle(VpadnAdapter.class, bundle);

adLoader.loadAd(builder.build());
```


<!-- 
>**Note:** 关于自定义参数值的定义，请参考以下说明


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
 -->


<!-- # Corona User
---
如果您的 App 使用 Corona 欲串接 Vpon 广告，我们建议您用 Web SDK 的方式串接，使用方法如下：

1. 请参考 [Vpon Web SDK 串接说明]，准备一个包含 Web SDK 广告请求的 HTML 档案
2. 在 WebView 中读取该 HTML 档案，例如：webView:request(“localfile.html”, system.ResourceDirectory)

> **Note**：更多 Corona SDK 文件可参考: [Corona Document] -->

[CrazyadSetting]: {{site.imgurl}}/CrazyadSetting.png
[注册帐号]: {{ site.baseurl }}/zh-cn/android/registration/
[开发商后台]: http://console.vpon.com
[Vpon Web SDK 串接说明]: {{site.baseurl}}/zh-cn/web/
[Corona Document]: http://docs.coronalabs.com/api/library/native/newWebView.html