---
layout:         "android"
title:          "Android - 中介服務"
lead:           ""
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       /zh-tw/android/mediation/
lang:           "zh-tw"
---

# 概要
---
透過中介服務，您的應用程式就能放送眾多來源 (包括 AdMob 聯播網、MoPub 聯播網、第三方廣告聯播網和內部廣告活動等來源) 的廣告。

# 完成串接準備
---
在開始串接廣告之前，請確認您已經將 Vpon SDK 導入您的專案中。若您尚未完成，請先參考[串接說明]完成相關設定。

# 中介服務平台
---

| AdMob         | Ad Manager |
| :-----------: | :---------:|
| [![admob]][1] | [![dfp]][2]|


# 透過 Mediation 回傳內容資訊
---
如果您是使用 Mediation 的方式來串接 Vpon SDK，您可以透過以下方式，將頁面內容資訊發給 Vpon：

* [AdMob / Google Ad Manager][5]
* [MoPub][6]

## AdMob / Google Ad Manager {#admob}

若您是使用 AdMob / Google Ad Manager 來進行 Mediation，請確認您所使用的 SDK 及 Adapter 版本：

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
builder.addCustomEventExtrasBundle(VpadnAdapter.class, bundle);

adLoader.loadAd(builder.build());
```


<!-- ## MoPub {#mopub}

若您是使用 MoPub 來進行 Mediation，請確認您所使用的 SDK 及 Adapter 版本：

* `Vpon SDK v5.1.1` 及以上版本
* `MoPub SDK v5.13.0` 及以上版本
* `Vpon MoPub Adapter v1.1.0` 及以上版本

```java
Map<String, Object> contentData = new HashMap<>();
contentData.put("key1", "MoPub");
contentData.put("key2", 1.2);
contentData.put("key3", true);

Map<String, Object> localExtras = new HashMap<>();
localExtras.put(AD_CONTENT_DATA, contentData);
localExtras.put(AD_CONTENT_URL, "https://www.vpon.com/zh-hant/");

adView.setLocalExtras(localExtras);
``` -->


[串接說明]: {{site.baseurl}}/zh-tw/android/integration-guide/

[admob]: {{site.imgurl}}/admob-logo2.png
[dfp]:   {{site.imgurl}}/GoogleAdManagerLogo.png
[mopub]: {{site.imgurl}}/mopub-logo.png
[smaato]: {{site.imgurl}}/smaato-logo.png

[1]: admob
[2]: dfp
[3]: mopub
[4]: smaato
[5]: {{site.baseurl}}/zh-tw/android/mediation/#admob
[6]: {{site.baseurl}}/zh-tw/android/mediation/#mopub