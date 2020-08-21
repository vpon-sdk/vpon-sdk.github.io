---
layout:         "android"
title:          "Android - Mediation"
lead:           ""
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       android/mediation/
lang:           "en"
---
## Finished Integration Guide
---
If you haven't finished the previous integration guide, please check all the [settings here](../integration-guide/).

# Overview
---
AdMob Mediation is a feature that lets you serve ads to your apps from multiple sources, including the AdMob Network, Mopub Network, third-party ad networks and house ad campaigns.


# Mediation Platforms
---

| AdMob         | Ad Manager | MoPub        | Smaato         |
| :-----------: | :---------:| :-----------:| :------------: |
| [![admob]][1] | [![dfp]][2]| [![mopub]][3]| [![smaato]][4] |



# Send Content Data To Vpon Via Mediation
---
Please follow the instruction below to send the content information to Vpon if you are trying to integrate Vpon SDK with below Mediation Platforms:

* [AdMob / Google Ad Manager][5]
* [MoPub][6]

## AdMob / Google Ad Manager {#admob}

Please check your SDK and Adapter version first if you are using AdMob / Google Ad Manager, the SDK and Adapter version must be:

* `Vpon SDK v5.1.1` and above
* `Vpon AdMob Adapter v2.0.1` and above

Please refer to below sample if you are integrating Banner Ad or Interstitial Ad:

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

Please refer to below sample if you are integrating Native Ad:

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

Please check your SDK and Adapter version first if you are using Mopub, the SDK and Adapter version must be:

* `Vpon SDK v5.1.1` and above
* `MoPub SDK v5.13.0` and above
* `Vpon MoPub Adapter v1.1.0` and above

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



[admob]: {{site.imgurl}}/admob-logo2.png
[dfp]:   {{site.imgurl}}/GoogleAdManagerLogo.png
[mopub]: {{site.imgurl}}/mopub-logo.png
[smaato]: {{site.imgurl}}/smaato-logo.png

[1]: admob
[2]: dfp
[3]: mopub
[4]: smaato
[5]: {{site.baseurl}}/android/mediation/#admob
[6]: {{site.baseurl}}/android/mediation/#mopub