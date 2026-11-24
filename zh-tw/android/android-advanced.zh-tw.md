---
layout:         "android"
title:          "Android - 自定義廣告請求參數"
lead:           "幫助您取得更多廣告功能與資料收集"
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       /zh-tw/android/custom-request-params/
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

builder.addKeyword(String);
builder.addKeywords(Set<String>);
```

# 回傳內容資訊
---
您可以透過 `setContentUrl` 及 `setContentData` 將頁面內容資訊透過 SDK 發給 Vpon

>**Note:** 此功能適用於 `Vpon SDK v5.1.1` 及以上版本

```java
VponAdRequest.Builder builder = new VponAdRequest.Builder();

HashMap<String, Object> contentData = new HashMap<>();
contentData.put("key1", "Vpon");
contentData.put("key2", 1.2);
contentData.put("key3", true);

builder.setContentData(contentData);
builder.setContentUrl("https://www.vpon.com/zh-hant/");
```

# 透過 Mediation 回傳內容資訊
---
如果您是使用 Mediation 的方式來串接 Vpon SDK，您可以透過以下方式，將頁面內容資訊發給 Vpon：


## AdMob / Google Ad Manager {#admob}

若您是使用 AdMob / Google Ad Manager 來進行 Mediation，請確認您所使用的 SDK 及 Adapter 版本：

* `Vpon SDK v5.1.1` 及以上版本
* `Vpon AdMob Adapter v2.0.1` 及以上版本

若您串接的是橫幅廣告或插頁廣告，請參考以下範例：

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

若您串接的是原生廣告，請參考以下範例：

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
