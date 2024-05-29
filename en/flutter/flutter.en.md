---
layout:         "flutter"
title:          "Flutter - Getting Started"
lead:           ""
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       /flutter/
lang:           "en"
---

# Overview
---

This guideline will instruct you to integrate Vpon SDK with Vpon Flutter Plugin. 

Please finish your [Vpon Publisher Application](http://console.vpon.com/register.action) first. You'll receive a validation code in the mailbox which you use to register as a Vpon Publisher. Enter the validation code and verified your account.

After registeration, Please follow the steps below to finish your integration.

1. [Import and Initialize SDK](#initsdk)
2. [Banner Ad Implementation](http://wiki.vpon.com/flutter/banner)
3. [Insterstitial Ad Implementation](http://wiki.vpon.com/zh-tw/flutter/interstitial)

You can alse check this guideline and the information about the plugin on [pub.dev].

>**Note:** Support Vpon SDK `Android v5.6.4` and `iOS v5.6.2` above.



# Import and Initialize SDK {#initsdk}
---

## Import SDK
---

Add Vpon Flutter Plugin with below command:

```
$ flutter pub add vpon_plugin_poc
```

Check your package's pubspec.yaml to see if below dependency added:

```
dependencies:
  vpon_mobile_ads: ^0.0.1
```

## Initialize SDK
---

Please initialize Vpon SDK by calling `VponAdSDK.instance.initialize()` before loading ads:

```dart
import 'package:vpon_mobile_ads/vpon_ad_sdk.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  VponAdSDK.instance.initialize();
  runApp(MyApp());
}
```

[pub.dev]: https://pub.dev/packages/vpon_mobile_ads/install

