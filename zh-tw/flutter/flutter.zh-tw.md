---
layout:         "flutter"
title:          "Flutter - 開始使用"
lead:           "快速上手 - 串接 SDK 與顯示廣告"
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       /zh-tw/flutter/
lang:           "zh-tw"
---

# 總覽
---
Vpon 提供 Flutter Plugin，若您使用 Flutter 開發您的 App，可以參照本系列文件完成 Vpon SDK 串接。

在開始串接之前，請先註冊成為 Vpon 開發商夥伴，並取得 Vpon License Key

* [註冊成為 Vpon 開發商夥伴](http://console.vpon.com/register.action)
* [申請 License Key](http://console.vpon.com)

完成註冊後，請根據您計劃串接的廣告類型完成串接

1. [引入及初始化 SDK](#initsdk)
2. [橫幅廣告串接](http://wiki.vpon.com/zh-tw/flutter/banner)
3. [插頁廣告串接](http://wiki.vpon.com/zh-tw/flutter/interstitial)

您也可以在 [pub.dev] 查看我們的串接文件與 Plugin 訊息。

>**Note:** 支援 Vpon SDK `Android v5.6.4` 及 `iOS v5.6.2` 以上版本。

# 引入及初始化 SDK {#initsdk}
---

## 引入 SDK
---

請透過以下指令加入 Vpon Flutter Plugin:

```
$ flutter pub add vpon_plugin_poc
```

確認在您專案的 pubspec.yaml 是否有加入以下 dependency:

```
dependencies:
  vpon_mobile_ads: ^0.0.1
```

## 初始化 SDK
---

請在請求廣告之前，呼叫 `VponAdSDK.instance.initialize()` 完成 SDK 初始化：

```dart
import 'package:vpon_mobile_ads/vpon_ad_sdk.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  VponAdSDK.instance.initialize();
  runApp(MyApp());
}
```

[pub.dev]: https://pub.dev/packages/vpon_mobile_ads/install

