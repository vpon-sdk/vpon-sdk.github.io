---
layout: "ios"
title: "常见问题"
lead: ""
description:
keywords: 'Keywords for this page, in the meta data'
permalink: /zh-cn/ios/faq/
lang: "zh-cn"
---

# General
---


### 广告没有成功展示时的状况判断
---
当您的应用程式或网站向 Vpon 发出广告请求而没有广告展示时，您可以从回应的 Log 中初步判断广告没有回传的原因。

您可以在您的 IDE 或是浏览器的开发者工具中，看到类似以下的 Log：<br>
(以浏览器开发者工具为例)

```
Vpadn-Status-Code -> -2
Vpadn-Status-Desc -> banner position with ad format not consistent
Vpadn-Status -> INVALID_REQUEST
```
<br>
请参考以下讯息排除基本问题：

* SERVER_ERROR：广告请求失败，表示 Vpon Ad Server 无法回应您的广告请求，请尽速与 [Vpon FAE] 联系
* NO_FILL：广告请求成功，但由于当下的广告档期安排，暂无广告回传，建议可以稍候再进行测试，或是使用测试广告以确保每次广告请求都有广告回传
* INVALID_REQUEST：广告请求失败，表示广告请求中传入的参数有误，请检查是否使用了对应正确平台、版位的 Vpon License Key 来进行广告请求

如果您仍无法确认没有广告展示的原因，请将以上的 Log 提供给 [Vpon FAE]，我们会协助您确认没有广告显示的原因。



# Android
---

### 导入 Vpon SDK 时发现需要提供多种 Privacy Permission，请问是否所有的 Permission 都需要加入呢？
---

否，请参考 [Android SDK 权限说明]，除了必须加入的 Permission 外，您可以依实际状况选择是否加入额外的 Permission。

然多样化的权限有助于增加使用者体验的广告投放，请在不影响使用者个人隐私且不违背平台 (Google Play / Apple Store) 的广告政策下，斟酌加入相关权限。

<br>

### 为什么开发测试时可以看到广告，App 上架后就看不到了？有时还会看到类似以下的 Log
---

```
...
W/System.err: java.lang.ClassNotFoundException: c.Device
W/System.err:     at java.lang.Class.classForName(Native Method)
W/System.err:     at java.lang.Class.forName(Class.java:453)
W/System.err:     at java.lang.Class.forName(Class.java:378)
W/System.err:     at vpadn.ec.a(SourceFile:102)
W/System.err:     at vpadn.ec.a(SourceFile:78)
W/System.err:     at vpadn.ed.a(SourceFile:359)
W/System.err:     at vpadn.ed.a(SourceFile:317)
W/System.err:     at b.i.exec(SourceFile:46)
W/System.err:     at android.os.MessageQueue.nativePollOnce(Native Method)
W/System.err:     at android.os.MessageQueue.next(MessageQueue.java:325)
W/System.err:     at android.os.Looper.loop(Looper.java:142)
W/System.err:     at android.os.HandlerThread.run(HandlerThread.java:65)
W/System.err: Caused by: java.lang.ClassNotFoundException: Didn't find class "c.Device" on path: ......
W/System.err:     at dalvik.system.BaseDexClassLoader.findClass(BaseDexClassLoader.java:125)
W/System.err:     at java.lang.ClassLoader.loadClass(ClassLoader.java:379)
W/System.err:     at java.lang.ClassLoader.loadClass(ClassLoader.java:312)
W/System.err:     ... 12 more
I/System.out: Error adding plugin c.Device.
...
```

请确认是否有按照 [Vpon Proguard Configuration] 中的描述，确实在您的 Proguard Config 中加上正确的设定。

<br>

### 导入 SDK 时，发生错误
---

若您在导入 Vpon SDK 或展示广告时发生错误，可以参考以下讯息排除问题。

#### Retrofit Library

```
E/AndroidRuntime: FATAL EXCEPTION: AsyncTask #1
    java.lang.RuntimeException: An error occurred while executing doInBackground()
        at android.os.AsyncTask$3.done(AsyncTask.java:353)
        ...
     Caused by: java.lang.NoClassDefFoundError: Failed resolution of: Lretrofit2/Retrofit$Builder;
        at vpadn.bt.a(RestUtil.java:161)
        at vpadn.af$c.a(VponNativeAdController.java:1747)
        ...
     Caused by: java.lang.ClassNotFoundException: Didn't find class "retrofit2.Retrofit$Builder" on path:...
        at dalvik.system.BaseDexClassLoader.findClass(BaseDexClassLoader.java:125)
        at java.lang.ClassLoader.loadClass(ClassLoader.java:379)
        at java.lang.ClassLoader.loadClass(ClassLoader.java:312)
        ...
        Suppressed: java.io.IOException: No original dex files found for dex location /data/app/com.lilylee.vpon.vponnative-djN4vBXtkLUW-YF0pezrHQ==/split_lib_resources_apk.apk
        at dalvik.system.DexFile.openDexFileNative(Native Method)
        at dalvik.system.DexFile.openDexFile(DexFile.java:353)
        at dalvik.system.DexFile.<init>(DexFile.java:100)
        ...
```

由于 Vpon SDK 在 4.8.0 后开始引入第三方 Library － Retrofit，请务必参考 [3rd-party Library 导入说明]，在导入 Vpon SDK 时，也导入 Retrofit Library。


#### min SDK version

```
Manifest merger failed : uses-sdk:minSdkVersion 15 cannot be smaller than version 17 declared in library [com.vpon:vpadnSDK:4.9.1] 
vpadnSDK-4.9.1.aar/bc33461699d404214699093ae210c1ba/AndroidManifest.xml as the library might be using APIs not available in 15
    Suggestion: use a compatible library with a minSdk of at most 15,
        or increase this project's minSdk version to at least 17,
        or use tools:overrideLibrary="com.vpon.sdk" to force usage (may lead to runtime failures)
```

由于 Vpon SDK 目前支援的 minSdkVersion 为 Android 4.3 (API Level 18) 以上的版本，若您在导入 SDK 时发生这样的错误，请先确认您的 App 的 minSdkVersion 是否符合系统需求。


<!-- #### VpadnActivity

```
E/VPADN: [::VponInterstitialAdController::]  Don't add com.vpadn.widget.VpadnActivity to your AndroidManifest.xml
```

如果您要使用 Vpon 的插页广告的话，请务必按照 [Vpon 串接说明文件]，在您的 AndroidManifest.xml 中加入 VpadnAdcitiy。 -->

<br>

### Vpon 支援 AdMob (Google Ad Manager) Native Ad Mediation 吗？
---

Vpon 目前以自订事件的方式支援 AdMob (Google Ad Manager) Native Ad Mediation，请参考我们的 [Android 中介服务说明文件]，完成在 AdMob 后台的设定。

<br>

### 广告请求回应为 NO_FILL，还有什么方法可以进行测试？
---

Vpon 提供测试广告，请参考 [Android 测试广告]呼叫测试广告，以便测试。



# iOS
---

### Vpon SDK 支援在配备 M1 Chip 的 Mac 模拟器上执行吗？
---

Vpon SDK 目前不支援在配备 M1 Chip 的 Mac 模拟器上执行。如果您计画在配备 M1 Chip 的 Mac 上进行开发，建议您透过实机进行测试。

<br>

### Vpon 支援 AdMob (Google Ad Manager) Native Ad Mediation 吗？
---

Vpon 目前以自订事件的方式支援 AdMob (Google Ad Manager) Native Ad Mediation，请参考我们的 [iOS 中介服务说明文件]，完成在 AdMob 后台的设定。


要透过 Google Mobile Ad SDK 进行 Native Ad 的串接，请务必确认您使用的是以下版本的 SDK，并搭配 Custom Event 的设定，以免影响您的收益。

* Google Mobile Ad SDK 4.47.0 以上
* Vpon iOS SDK 4.9.1 以上
* Vpon AdMob Adapter 1.1.3 以上


<br>

### 可以利用 Webview 串接 Vpon Web SDK 吗？
---

您可以透过 Webview 串接 Vpon Web SDK，在串接时，请务必确认以下项目：

* 请在 Vpon 开发者后台申请一组平台为`行动版网页`的 License Key
* 请确保 Webview 内的广告被点击后，会跳转至浏览器并完整显示 Landing Page

若您是使用 `WKWebView` 来展示广告，为确保广告被点击后会跳转至浏览器并完整显示 Landing Page，请务必实作 `WKUIDelegate`。

```objc
// WKUIDelegate Sample Code

(WKWebView *)webView:(WKWebView *)webView createWebViewWithConfiguration:(WKWebViewConfiguration *)configuration forNavigationAction:(WKNavigationAction *)navigationAction windowFeatures:(WKWindowFeatures *)windowFeatures {
    if (navigationAction.request.URL) {
        NSURL *url = navigationAction.request.URL;
        NSString *urlPath = url.absoluteString;
        if ([urlPath rangeOfString:@"https://"].location != NSNotFound ||
            [urlPath rangeOfString:@"http://"].location != NSNotFound) {
                [[UIApplication sharedApplication] openURL:url options:@{} completionHandler:^(BOOL success) {
                }];
            }
        }
    return nil;
}
```

<br>

### 广告请求回应为 NO_FILL，还有什么方法可以进行测试？
---

Vpon 提供测试广告，请参考 [iOS 测试广告]呼叫测试广告，以便测试。



# Web
---

### 广告请求回应为 NO_FILL，还有什么方法可以进行测试？
---

Vpon 提供测试广告，请参考以下范例，将 vpon_ad_test 的参数设置为 `1`，即可取测试广告。

```html
<vpon vpon_ad_test="1"
          vpon_ad_licensy_key="License Key"
          vpon_ad_format="320x50_mb"
          debug="true"></vpon>
<script type="text/javascript"  src="//m.vpon.com/sdk/vpadn-sdk.js"> </script>
```

<br>

### Vpon Mobile Web 广告有提供 Passback 吗？
---

Vpon 提供没有广告回传时的 Callback Function，请参考 [Web SDK Callback Function]，在没有广告时使用您指定的 Passback。

```html
<vpon vpon_ad_test="0"
        vpon_ad_licensy_key="License Key"
        vpon_ad_format="320x50_mb"
        debug="true"
        ad_request_callback="vponCallBackMethod"></vpon>
  <script type="text/javascript"  src="//m.vpon.com/sdk/vpadn-sdk.js"> </script>
  <script>
        function vponCallBackMethod(adStatus) {
          if (adStatus != 0) {
            // 没有广告回传，执行其它操作
          } else {
            // 有广告回传
          }
        }
  </script>
```



[Android SDK 权限说明]: {{site.baseurl}}/zh-cn/android/integration-guide/#加入-permission
[Vpon Proguard Configuration]: {{site.baseurl}}/zh-cn/android/integration-guide/#proguard-configuration
[3rd-party Library 导入说明]: {{site.baseurl}}/zh-cn/android/integration-guide/#3rd-party-library
[Android 中介服务说明文件]: {{site.baseurl}}/zh-cn/android/mediation/admob/#customevent
[Android 测试广告]: {{site.baseurl}}/zh-cn/android/banner/#测试广告
[iOS 中介服务说明文件]: {{site.baseurl}}/zh-cn/ios/mediation/admob/#customevent
[iOS 测试广告]: {{site.baseurl}}/zh-cn/ios/banner/#测试广告
[Web SDK Callback Function]: {{site.baseurl}}/zh-cn/web/original-banner/#callback
[Vpon FAE]: mailto:fae@vpon.com