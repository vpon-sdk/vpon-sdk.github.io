---
layout:         "flutter"
title:          "Flutter - 开始使用"
lead:           "快速上手 - 串接 SDK 与显示广告"
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       /zh-cn/flutter/
lang:           "zh-cn"
---

# 总览
---
Vpon 提供 Flutter Plugin，若您使用 Flutter 开发您的 App，可以参照本系列文件完成 Vpon SDK 串接。

在开始串接之前，请先注册成为 Vpon 开发商伙伴，并取得 Vpon License Key：

* [注册成为 Vpon 开发商伙伴](http://console.vpon.com/register.action)
* [申请 License Key](http://console.vpon.com)

完成注册后，请根据您计划串接的广告类型完成串接：

1. [引入及初始化 SDK](#initsdk)
2. [横幅广告串接](http://wiki.vpon.com/zh-cn/flutter/banner)
3. [插页广告串接](http://wiki.vpon.com/zh-cn/flutter/interstitial)

您也可以在 [pub.dev] 查看我们的串接文件与 Plugin 讯息。

>**Note:** 支援 Vpon SDK `Android v5.6.4` 及 `iOS v5.6.2` 以上版本。

# 引入及初始化 SDK {#initsdk}
---

## 引入 SDK
---

请透过以下指令加入 Vpon Flutter Plugin:

```
$ flutter pub add vpon_plugin_poc
```

确认在您专案的 pubspec.yaml 是否有加入以下 dependency:

```
dependencies:
 vpon_mobile_ads: ^0.0.1
```

## 初始化 SDK
---

请在请求广告之前，呼叫 `VponAdSDK.instance.initialize()` 完成 SDK 初始化：

```dart
import 'package:vpon_mobile_ads/vpon_ad_sdk.dart';

void main() {
 WidgetsFlutterBinding.ensureInitialized();
 VponAdSDK.instance.initialize();
 runApp(MyApp());
}
```

[pub.dev]: https://pub.dev/packages/vpon_mobile_ads/install

