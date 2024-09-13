---
layout:         "android"
title:          "Android - Mediation"
lead:           ""
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       android/mediation/
lang:           "en"
---

# Overview
---
AdMob Mediation is a feature that lets you serve ads to your apps from multiple sources, including the AdMob Network, Mopub Network, third-party ad networks and house ad campaigns.



## Finished Integration Guide
---
If you haven't finished the previous integration guide, please check all the [settings here](../integration-guide/).

Besides, you have to download and import Vpon Adapter in your project:


| Mediation Platform | Adapter | Compatible SDK Version|
|:------------------:|:-------:|:---:|
| AdMob <br> Google Ad Manager <br> (v2.1.0) | [download] | Vpon SDK 5.2.0 ↑ <br> GMA SDK 19.4 ↑ | 


# Mediation Platforms
---

| AdMob         | Ad Manager |
| :-----------: | :---------:|
| [![admob]][1] | [![dfp]][2]|





<!-- ## MoPub {#mopub}

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
``` -->



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
[download]: https://github.com/vpon-sdk/Vpon-android-examples/tree/master/admob-adapter