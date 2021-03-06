---
layout:         "android"
title:          "Android - 中介服务"
lead:           ""
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       /zh-cn/android/mediation/
lang:           "zh-cn"
---

## 完成串接指示
---
若您尚未完成串接广告形式前的串接说明，请先前往[串接说明]完成相关设定

# 概要
---
透过 AdMob 中介服务，您的应用程式就能放送众多来源 (包括 AdMob 联播网、MoPub 联播网、第三方广告联播网和内部广告活动) 的广告。


# 中介平台
---

| AdMob         | Ad Manager | MoPub        | Smaato         |
| :-----------: | :---------:| :-----------:| :------------: |
| [![admob]][1] | [![dfp]][2]| [![mopub]][3]| [![smaato]][4] |


# 透过 Mediation 回传内容资讯
---
如果您是使用 Mediation 的方式来串接 Vpon SDK，您可以透过以下方式，将页面内容资讯发给 Vpon：

* [AdMob / Google Ad Manager][5]
* [MoPub][6]

## AdMob / Google Ad Manager {#admob}

若您是使用 AdMob / Google Ad Manager 来进行 Mediation，请确认您所使用的 SDK 及 Adapter 版本：

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
builder.addCustomEventExtrasBundle(VpadnAdapter.class, bundle);

adLoader.loadAd(builder.build());
```

## MoPub {#mopub}

若您是使用 MoPub 来进行 Mediation，请确认您所使用的 SDK 及 Adapter 版本：

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
```


[串接说明]: ../integration-guide

[admob]: {{site.imgurl}}/admob-logo2.png
[dfp]:   {{site.imgurl}}/GoogleAdManagerLogo.png
[mopub]: {{site.imgurl}}/mopub-logo.png
[smaato]: {{site.imgurl}}/smaato-logo.png

[1]: admob
[2]: dfp
[3]: mopub
[4]: smaato
[5]: {{site.baseurl}}/zh-cn/android/mediation/#admob
[6]: {{site.baseurl}}/zh-cn/android/mediation/#mopub