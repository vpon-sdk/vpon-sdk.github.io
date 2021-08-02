---
layout:         "web"
title:          "Web - FAQ"
lead:           ""
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       web/faq/
lang:           "en"
---

# General
---


### Troubleshooting When No Ads To Show
---
You can try to troubleshoot why are ads not showing via the Log in your console after you sent ad requests from your application or website.

You can find Log as below in your IDE or the tool for Web Developers in your browser. Take the tool for Web Developer as an example, you can see Log as below after you sent an ad request:<br>

```
Vpadn-Status-Code -> -2
Vpadn-Status-Desc -> banner position with ad format not consistent
Vpadn-Status -> INVALID_REQUEST
```
<br>
Please find the message below to troubleshoot:

* SERVER_ERROR: The ad request was unsuccessful since the server was unabilable temporary. Please contact [Vpon FAE] if you see this message.
* NO_FILL: The ad request was successful. But you won't see Vpon ad since there was no appropriate ad to deliver in the period. Please try to send the request later or request our test ads for your testing.
* INVALID_REQUEST: The ad request was invalid. Please confirm that you have applied a correct License Key with right platform and ad format setting to request ads.

Please send the Log to [Vpon FAE] if you have any further question about these.


# Android
---

### Is It Necessary To Add All Vpon Recommend Privacy Permissions To My App?
---

No, please refer to [Android SDK Permission Setting] to add required permissions. And you can add the optional permissions for your requirement.

Since that the optional permissions will help us to optimize ad performance and user experience, we recommend that you can add the optional permissions on the occasion that can be complicant with the platform restrictions and privacy regulation.


<br>

### I Can't See Vpon Ads After I Published My App, And Here Is Log I Got:
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

Please help to check if you have finished your Progurad setting on our demand in [Vpon Proguard Configuration].

<br>

### Errors Occurred While Importing Vpon SDK
---

Please refer to the instruction below to simply troubleshoot and fix the errors.

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

Vpon SDK start to import 3rd-party Library - Retrofit from 4.8.0, please follow [Import 3rd-party Library] to import Retrofit Library.


#### minSdkVersion

```
Manifest merger failed : uses-sdk:minSdkVersion 15 cannot be smaller than version 17 declared in library [com.vpon:vpadnSDK:4.9.1] 
vpadnSDK-4.9.1.aar/bc33461699d404214699093ae210c1ba/AndroidManifest.xml as the library might be using APIs not available in 15
    Suggestion: use a compatible library with a minSdk of at most 15,
        or increase this project's minSdk version to at least 17,
        or use tools:overrideLibrary="com.vpon.sdk" to force usage (may lead to runtime failures)
```

Vpon SDK now supoort minSdkVersion Android 4.3 (API Level 18). Please make sure you have adjusted the minSdkVersion to API Level 18.


<!-- #### VpadnActivity

```
E/VPADN: [::VponInterstitialAdController::]  Don't add com.vpadn.widget.VpadnActivity to your AndroidManifest.xml
```

Please follow [Vpon 串接說明文件] to add VpadnActivity in your AndroidManifest.xml
如果您要使用 Vpon 的插頁廣告的話，請務必按照 [Vpon 串接說明文件]，在您的 AndroidManifest.xml 中加入 VpadnActivity -->

<br>

### Can I Display Native Ad Via AdMob (Google Ad Manager)?

---

Vpon support to display Native Ad via AdMob (Google Ad Manager) Custom Event. Please refer to [Android Mediation Instruction] to finish your setting on AdMob.


<br>

### How Can I Test The Ads Uf I Got NO_FILL?
---

Please try to request Vpon Test Ads for your testing. To display Vpon Test Ads, please refer to [Android Test Ads].



# iOS
---

### Can I Build My App With Vpon SDK On The Simulator On Mac With M1 Chip?
---

Vpon SDK isn't compatible with the simulator on Mac with M1 chip. If you are trying to develop your App on Mac with M1 chip, we recommend that it would better to test with a real device.

<br>

### Can I Display Native Ad Via AdMob (Google Ad Manager)?

---

Vpon support to display Native Ad via AdMob (Google Ad Manager) Custom Event. Please refer to [iOS Mediation Instruction] to finish your setting on AdMob.

Please make sure the SDK you're using meet below requirements:

* Google Mobile Ad SDK 4.47.0 or above
* Vpon iOS SDK 4.9.1 or above
* Vpon AdMob Adapter 1.1.3 or above


<br>

### Can I Integrate Vpon Web SDK To Display Ads In iOS Webview?
---

Yes, and please confirm below items if you're trying to display Vpon ads in iOS Webview:

* Create a new License Key for `Mobile Web` in Vpon Publisher Panel
* Make sure the Landing Page will be opened in the browser if the ads be clicked

You must implement `WKUIDelegate` to handle the click action if you're trying to display `WKWebView` to display Vpon ads.


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

### How Can I Test The Ads Uf I Got NO_FILL?
---

Please try to request Vpon Test Ads for your testing. To display Vpon Test Ads, please refer to [iOS Test Ads].


<br>

### Error Occur When Using SDK v5.3.0 Or Above
---

If you see an error as below

![FAQ_01.png]

Please try to modify the Embed setting of VpadnSDKAdKit.framework from Do Not Embed to Embed & Sign in the Project Setting.

![FAQ_02.png]



# Web
---

### How Can I Test The Ads If I Got NO_FILL?
---

Please follow the sample code below to replace the parameter of vpon_ad_test from `0` to `1` to get Vpon Test Ads for your testing.


```html
<vpon vpon_ad_test="1"
          vpon_ad_licensy_key="License Key"
          vpon_ad_format="320x50_mb"
          debug="true"></vpon>
<script type="text/javascript"  src="//m.vpon.com/sdk/vpadn-sdk.js"> </script>
```

<br>

### Can I Set Up Passback Ad For Vpon Mobile Web Ads?
---

Please refer to [Web SDK Callback Function] to implement the Passback Ad.

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
            // No ads, do something here.
          } else {
            // Ad Received.
          }
        }
  </script>
```



[Android SDK Permission Setting]: {{site.baseurl}}/android/integration-guide/#permission
[Vpon Proguard Configuration]: {{site.baseurl}}/android/integration-guide/#proguard-configuration
[Import 3rd-party Library]: {{site.baseurl}}/android/integration-guide/#3rd-party-library
[Android Mediation Instruction]: {{site.baseurl}}/android/mediation/admob/#customevent
[Android Test Ads]: {{site.baseurl}}/android/banner#request-for-test-ad
[iOS Mediation Instruction]: {{site.baseurl}}/ios/mediation/admob/#customevent
[iOS Test Ads]: {{site.baseurl}}/ios/banner/#request-for-test-ad
[Web SDK Callback Function]: {{site.baseurl}}/web/original-banner/#callback
[Vpon FAE]: mailto:fae@vpon.com
[FAQ_01.png]: {{site.imgurl}}/FAQ_01.png
[FAQ_02.png]: {{site.imgurl}}/FAQ_02.png